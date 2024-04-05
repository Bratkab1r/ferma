const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors');
const knex = require('./DB/DB')
const path = require("path");
const uuid = require("uuid")
const cookies = require("cookie-parser")
app.use(cookies())
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
const {body, validationResult} = require('express-validator')
const ApiError = require("./exeptions/apiError");
const bcrypt = require('bcrypt')
const userDto = require("./dtos/user-dto");
const tokenService = require('./services/token-services')
const multer = require("multer");
app.use('/public', express.static(path.join(__dirname + '/public')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single('file')

app.post('/cancel-order', async (req, res, next) => {
    try {
        const {order_id} = req.body
        const existOrder = (await knex("orders").where("order_id", order_id))[0]

        for (const product of existOrder.order_json) {
                await knex("products").where("id", product.id).update({quantity: product.quantity})
        }

        await knex("orders").where("order_id", order_id).update({status: "Отменен"})

        res.send("order has been canceled")
    } catch (e) {
        next(e)
    }
})

app.post('/change-category', async (req, res, next) => {
    try {
        const {category_id, category_name, deleted} = req.body
        if (deleted) {
            await knex("categories").where("category_id", category_id).del()
        } else if (category_id === 0) {
            await knex("categories").insert({
                category_name
            })
        } else {
            await knex("categories").where("category_id", category_id).update({category_name})
        }
        res.status(200).send("category has been changed")
    } catch (e) {
        next(e)
    }
})

app.post('/change-product', async (req, res, next) => {
    try {
        const {product} = req.body

        if (product.id === 0) {
            const resp = await knex("products").returning('id').insert({
                title: product.title,
                description: product.description,
                price: product.price,
                category_id: product.category_id,
                img_url: product.img_url,
                quantity: product.quantity
            })
            res.status(200).json({id: resp[0].id})
        } else {
            await knex("products").update({
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category_id: product.category_id
            }).where("id", product.id)
            res.status(200).json({id: product.id})
        }
    } catch (e) {
        next(e)
    }
})

app.post('/admin-cancel-order', async (req, res, next) => {
    try {
        const {order_id} = req.body
        const existOrder = (await knex("orders").where("order_id", order_id))[0]

        for (const product of existOrder.order_json) {
            await knex("products").where("id", product.id).update({quantity: product.quantity})
        }

        await knex("orders").where("order_id", order_id).update({status: "Отменен администратором"})

        res.send("order has been canceled")
    } catch (e) {
        next(e)
    }
})

app.get('/orders/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const orders = await knex
            .select('*')
            .from('orders')
            .where("user_id", id)

        res.send(orders)
    } catch (e) {
        next(e)
    }
})

app.post('/accept-order', async (req, res, next) => {
    try {
        const {order_id} = req.body

        await knex("orders").where("order_id", order_id).update({status: "Собирается"})

        setTimeout(async () => {
            const status = await knex.select("status").from("orders").where("order_id", order_id)
            if (status[0].status !== "Отменен") {
                await knex("orders").where("order_id", order_id).update({status: "Готов к выдаче"})
            }
        }, 15000)

        res.send("order has been created")
    } catch (e) {
        next(e)
    }
})

app.post('/create-order', async (req, res, next) => {
    try {
        const {password, order, user_id} = req.body
        const hashedPassword = await knex.select("password").from("users").where("uid", user_id)
        const isCorrectPassword = await bcrypt.compare(password, hashedPassword[0].password)

        if (!isCorrectPassword) {
            throw ApiError.NotCorrectPassword()
        }

        const parsedOrder = JSON.parse(order)

        for (const product of parsedOrder) {
            await knex("products")
                .where("id", product.id)
                .update({quantity: (product.quantity - product.selected_quantity)})
        }

        const title = uuid.v4()

        await knex("orders").insert({
            user_id: user_id,
            order_json: order,
            status: "Обработка",
            title: title
        })

        res.send("order has been created")
    } catch (e) {
        next(e)
    }
})

app.get('/categories', async (req, res, next) => {
    try {
        const categories = await knex
            .select('*')
            .from('categories')

        res.send(categories)
    } catch (e) {
        next(e)
    }
})

app.get('/all-orders', async (req, res, next) => {
    try {
        const orders = await knex
            .select('*')
            .from('orders')
            .leftJoin("users", "orders.user_id", "users.uid")

        res.send(orders)
    } catch (e) {
        next(e)
    }
})

app.post('/send-review', async (req, res, next) => {
    try {
        const {product_id, order_id, review, rating, name} = req.body

        await knex("reviews").insert({
            review,
            rating,
            product_id,
            name
        })

        const orderJson = await knex.select("*").from("orders").where("order_id", order_id)

        if (orderJson instanceof Array) {
            const newOrderJson = orderJson[0].order_json.map((product) => {
                if (product.id == product_id) {
                    const nProduct = {...product}
                    nProduct.review = "reviewed"
                    return nProduct
                } else {
                    return product
                }
            })
            await knex("orders").update({order_json: JSON.stringify(newOrderJson)}).where("order_id", order_id)
        }

        res.send("new review")
    } catch (e) {
        next(e)
    }
})

app.get('/products/reviews/:id', async (req, res, next) => {
    try {
        const {id} = req.params

        const reviews = await knex
            .select('*')
            .from('reviews')
            .where('product_id', id)

        res.send(reviews)
    } catch (e) {
        next(e)
    }
})

app.get('/products', async (req, res, next) => {
    try {
        const products = await knex
            .select('*')
            .from('products')
            .leftJoin("categories", "products.category_id", "categories.category_id")

        res.send(products)
    } catch (e) {
        next(e)
    }
})

app.get('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const product = await knex
            .select('*')
            .from('products')
            .leftJoin("categories", "products.category_id", "categories.category_id")
            .where("id", id)

        const extractedProduct = product[0]

        res.send(extractedProduct)
    } catch (e) {
        next(e)
    }
})

app.post('/cattle-otchetnic', async (req, res, next) => {
    try {
        await knex('otchetnic').insert({
            animal: req.body.animal,
            quantity: req.body.quantity,
        })
        res.send("Отчет успешно отправлен!")
    } catch (e) {
        next(e)
    }
})

app.get('/cattle-otchetnic', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const sortColumn = req.query.column || 'date';
    const sortDirection = req.query.direction || 'asc';

    const offset = (page - 1) * limit;

    const [countResult, reports] = await Promise.all([
        knex.withSchema("public").count("* as count").from("otchetnic").first(),
        knex.withSchema("public")
            .select("*")
            .from("otchetnic")
            .orderBy(sortColumn, sortDirection)
            .limit(limit)
            .offset(offset),
    ]);
    const total_pages = Math.ceil(countResult.count / limit);
    res.send({ results: reports, total_pages });
})

app.get('/cattle-animal-list', async (req, res, next) => {
    try {
        const animals = await knex('animal-list').select('*');
        res.send(animals);
    } catch (e) {
        next(e);
    }
});

app.post('/cattle-animal-list', async (req, res, next) => {
    try {
        const { animal } = req.body;
        await knex('animal-list').insert({ animal: req.body.animal });
        res.send('Животное успешно добавлено!');
    } catch (e) {
        next(e);
    }
});

app.delete('/cattle-animal-list/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await knex('animal-list').where('id', id).del();
        res.send('Животное успешно удалено!');
    } catch (e) {
        next(e);
    }
});

app.post('/cattle-report', async (req, res, next) => {
    try {
        await knex('report').insert({
            data: req.body.data,
            event: req.body.event,
            animal: req.body.animal,
            quantity: req.body.quantity,
            weight: req.body.weight,
            note: req.body.note
        })
        res.send("Отчет успешно отправлен!")
    } catch (e) {
        next(e)
    }
})
app.get("/cattle-report", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortColumn = req.query.column || 'quantity';
    const sortDirection = req.query.direction || 'asc';

    const offset = (page - 1) * limit;

    const [countResult, report] = await Promise.all([
        knex.withSchema("public").count("* as count").from("report").first(),
        knex.withSchema("public")
            .select("*")
            .from("report")
            .orderBy(sortColumn, sortDirection)
            .limit(limit)
            .offset(offset),
    ]);

    const total_pages = Math.ceil(countResult.count / limit);
    res.send({ results: report, total_pages });
});

// Удаление записи из таблицы report
app.delete('/cattle-report/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await knex('report').where('id', id).del();
        res.send('Запись успешно удалена');
    } catch (e) {
        next(e);
    }
})

// Обновление записи в таблице report
app.put('/cattle-report/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { data, event, animal, quantity, weight, note } = req.body;
        await knex('report').where('id', id).update({ data, event, animal, quantity, weight, note });
        res.send('Запись успешно обновлена');
    } catch (e) {
        next(e);
    }
})

app.post("/registration", body('email').isEmail(), body('password').isLength({
    min: 6, max: 36
}), async (req, res, next) => {
    const users = await knex
        .select('email')
        .from("users")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const hasDuplicates = await users.some(function (currentObject) {
            return currentObject.email.toLowerCase() === req.body.email;

        })
        if (hasDuplicates) {
            throw ApiError.BadRequest(`Пользователь уже зарегестрирован`)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await knex('users').insert({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        })
        const currentUser = await knex
            .select('email', 'uid')
            .from('users')
            .where('email', req.body.email)
        const userdto = new userDto(currentUser[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e) {
        next(e)
    }
})
app.post("/login", async (req, res, next) => {
    try {
        const user = await knex
            .select("*")
            .from("users")
            .leftJoin("roles", "users.role_ids", "roles.role_id")
            .where("email", req.body.email)

        if (!user[0]){
            throw ApiError.BadRequest('Данный пользователь не найден!')
        }
        const PassCompare = await bcrypt.compare(req.body.password, user[0].password)
        if (!PassCompare) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userdto = new userDto(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e){
        next(e)
    }
})

app.get('/refresh', async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;

        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await knex
            .select('*')
            .from('users')
            .leftJoin("roles", "users.role_ids", "roles.role_id")
            .where('uid', userData.id)

        const userdto = new userDto(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e) {
        next(e)
    }
})

app.post('/logout', async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken');
        res.send('Выход успешен')
    } catch (e) {
        next(e)
    }
})

app.post(
    "/upload",
    async (req, res, next) => {
        try {
            await upload(req, res, async (err) => {

                await knex('products')
                    .where("id", req.body.id)
                    .update({
                        img_url: `${req.file.originalname}`
                    })

                if (err) {
                    res.sendStatus(500);
                }
                res.send(req.file)
            });
        } catch (e) {
            next(e)
        }
    }
);



const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server listening on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
