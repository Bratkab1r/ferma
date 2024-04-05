import './productInfo.css'
import {useEffect, useState} from "react";
import {addToCart} from "../../../page/cart/Cart";

const ProductInfo = (props) => {
    const {title, description, price, category_name, img_url, quantity, id} = props.product
    const [addedProducts, setAddedProducts] = useState(false)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('farm-cart'))
        if (cart instanceof Array) {
            cart.forEach((pr) => {
                if (pr.id === id) {
                    setAddedProducts(true)
                }
            })
        }
    }, [id])

    return (
        <div className={'product-info-wrapper'}>
            <div className={'product-info-img'}>
                <img src={`http://localhost:3001/public/${img_url}`} alt={title}/>
            </div>
            <div className={'product-info-content'}>
                <div>
                    <h2>{title}</h2>
                    <p>Категория - {category_name}</p>
                    <p>Количество - {quantity}</p>
                </div>
                <p style={{opacity: '0.7'}}>{description}</p>
                <div className={'product-info-actions'}>
                    <div>
                        {price} руб.
                    </div>
                    <button disabled={props.product.quantity <= 0} onClick={() => {
                        if (!addedProducts) {
                            addToCart(props.product)
                            setAddedProducts(true)
                        }
                    }}>
                        {addedProducts ? "✓" : "В корзину"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo