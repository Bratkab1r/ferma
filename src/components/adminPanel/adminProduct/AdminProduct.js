import styled from "styled-components";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useCallback, useEffect, useRef, useState} from "react";
import * as Yup from "yup";

const AdminProductWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const AdminProductImgWrapper = styled.div`
    position: relative;
    height: 200px;
`

const AdminProductImgFilter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AdminProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 15px 15px 0 0;
`

const AdminProductField = styled(Field)`
    width: 100%;
`

const AdminProduct = ({selectedProduct, onCancel}) => {
    const fileInputRef = useRef(null)

    const [product, setProduct] = useState(undefined)
    const [categories, setCategories] = useState(undefined)

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct)
        } else {
            setProduct({
                id: 0,
                title: '',
                description: '',
                price: 0,
                category_id: 1,
                img_url: '',
                quantity: 0
            })
        }
    }, [selectedProduct]);

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/categories`);
        const json = await response.json();
        setCategories(json)
    }, [product])

    useEffect(() => {
        if (product) {
            fetchData()
        }
    }, [fetchData, product]);

    const handleSubmit = useCallback(async (nProduct) => {
        const response = await fetch('http://localhost:3001/change-product', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: nProduct
            }),
            credentials: "include"
        })
        const json = await response.json()
        return json
    }, [])

    const previewFile = useCallback(() => {
        let preview = document.getElementById('preview');
        let file = document.getElementById('selectFileInput').files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }, [])

    return (
        <AdminProductWrapper>
            {(product && categories) && <>
                <button style={{marginBottom: "1rem"}} onClick={() => {
                    onCancel()
                }}>Назад
                </button>
                <AdminProductImgWrapper>
                    <AdminProductImgFilter>
                        <button onClick={() => {
                            const fileInput = fileInputRef.current;
                            if (fileInput !== null) {
                                fileInput.click()
                            }
                        }}>Изменить
                        </button>
                    </AdminProductImgFilter>
                    <input
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        id={"selectFileInput"}
                        name="file"
                        onChange={() => {
                            previewFile()
                        }}
                        type={"file"}
                    />
                    <AdminProductImg src={`http://localhost:3001/public/${product.img_url}`} id={"preview"}/>
                </AdminProductImgWrapper>
                <Formik initialValues={product} validationSchema={
                    Yup.object({
                        title: Yup.string().max(20, "Максимум 20 символов").min(3, "Минимум 3 символа"),
                        description: Yup.string().min(20, "Минимум 20 символов"),
                        price: Yup.number().min(999, "Минимальная цена 999 руб.").required("Обязательное поле"),
                        category_id: Yup.number().required("Обязательное поле"),
                        quantity: Yup.number().required("Обязательное поле")
                    })
                } onSubmit={async (values, {setSubmitting}) => {
                    const cProduct = {...product, ...values}

                    console.log(cProduct)

                    const response = await handleSubmit(cProduct)
                    if ((fileInputRef.current !== null) && (fileInputRef.current.files !== null)) {
                        let file = fileInputRef.current.files[0];
                        if (file && response !== undefined) {
                            const data = new FormData()
                            data.append('file', file)
                            data.append('id', response.id)
                            await fetch("http://localhost:3001/upload", {method: "POST", body: data,})
                        }
                    }
                    setSubmitting(false)
                    onCancel()
                }}>
                    {
                        (values) => {
                            return (
                                <Form>
                                    <label>Название</label>
                                    <AdminProductField type={"text"} name={"title"} placeholder={"Корова"}/>
                                    <div style={{color: "red"}}>
                                        <ErrorMessage name={"title"}/>
                                    </div>
                                    <label>Описание</label>
                                    <AdminProductField type={"text"} name={"description"}
                                                       placeholder={"Самая лучшая корова"}/>
                                    <div style={{color: "red"}}>
                                        <ErrorMessage name={"description"}/>
                                    </div>
                                    <label>Цена</label>
                                    <AdminProductField type={"number"} name={"price"} placeholder={"99999"}/>
                                    <div style={{color: "red"}}>
                                        <ErrorMessage name={"price"}/>
                                    </div>
                                    <label>Категория</label>
                                    <div>
                                        <select
                                            onChange={async (event) => {
                                                await values.setFieldValue("category_id", Number(event.currentTarget.value))
                                            }}
                                            name={"category_id"}>
                                            {categories.slice().sort((a) => a.category_id === product.category_id ? -1 : 1).map((category, i) =>
                                                <option key={i} value={category.category_id}>
                                                    {category.category_name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    <label>Количество</label>
                                    <AdminProductField style={{marginBottom: "1rem"}} type={"number"} name={"quantity"}
                                                       placeholder={"5"}/>
                                    <div style={{color: "red"}}>
                                        <ErrorMessage name={"quantity"}/>
                                    </div>
                                    <button type={"submit"} disabled={values.isSubmitting || !values.isValid || !values.dirty}>Сохранить</button>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </>}
        </AdminProductWrapper>
    )
}

export default AdminProduct