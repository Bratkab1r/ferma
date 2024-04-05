import {useEffect, useState} from "react";
import "./cart.css"
import VerifyModal from "../../components/cart/verifyModal/VerifyModal";

export const addToCart = (product) => {
    const existsCart = JSON.parse(localStorage.getItem("farm-cart"))
    if (existsCart.some(e => e.id === product.id)) {
        existsCart.map((obj) => {
            if (obj.id === product.id) {
                obj.selected_quantity += 1;
            }
        })
        localStorage.setItem("farm-cart", JSON.stringify([...existsCart]))
    } else {
        localStorage.setItem("farm-cart", JSON.stringify([...existsCart, {...product, selected_quantity: 1}]))
    }
    return existsCart
}

export const removeFromCart = (product, force) => {
    const existsCart = JSON.parse(localStorage.getItem("farm-cart"))
    let a = []
    if (force) {
        a = existsCart.filter(obj => obj.id !== product.id)
    } else {
        if (product.selected_quantity === 1) {
            a = existsCart.filter(obj => obj.id !== product.id)
        } else {
            existsCart.map((obj) => {
                if (obj.id === product.id) {
                    obj.selected_quantity = obj.selected_quantity - 1;
                }
            })
            a = existsCart
        }
    }
    localStorage.setItem("farm-cart", JSON.stringify([...a]))
    return a
}

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [cart, setCart] = useState([])
    const [sum, setSum] = useState(0)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('farm-cart')))
    }, []);

    useEffect(() => {
        let tmpSum = 0;
        cart.forEach((pr) => {
            tmpSum += (pr.price * pr.selected_quantity)
        })
        setSum(tmpSum)
    }, [cart]);

    return (
        <>
            <VerifyModal isOpen={isOpen} onClose={() => setIsOpen(false)} onOrder={() => setCart([])}/>
            <div className={"body-container"}>
                <div>
                    <h1>Корзина</h1>
                </div>
                <div className={"cart-order-line"}>
                    <div>
                        Общая стоимость: {sum} руб.
                    </div>

                    <button onClick={() => setIsOpen(true)}>
                        Оформить заказ
                    </button>
                </div>
                <div>
                    {cart.map((pr, i) => <div className={"cart-entity-wrapper"} key={i}>
                        <div className={"cart-entity-img"}>
                            <img src={`http://localhost:3001/public/${pr.img_url}`}/>
                        </div>
                        <div className={"cart-entity-content"}>
                            <h4>{pr.title}</h4>
                            <div className={"cart-entity-actions"}>
                                <button
                                    onClick={() => setCart(removeFromCart(pr))}
                                    className={"cart-entity-plus"}>
                                    {pr.selected_quantity === 1 ? "x" : "-"}
                                </button>
                                <div>
                                    {pr.selected_quantity}
                                </div>
                                {pr.selected_quantity >= pr.quantity ? null : <button
                                    onClick={() => setCart(addToCart(pr))}
                                    className={"cart-entity-minus"}>
                                    +
                                </button>}
                            </div>
                        </div>
                        <div className={"cart-entity-sub"}>
                            {pr.price * pr.selected_quantity} руб.
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default Cart