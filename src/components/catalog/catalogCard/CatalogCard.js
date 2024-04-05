import "./catalogCard.css"
import {addToCart} from "../../../page/cart/Cart";
import {useNavigate} from "react-router-dom";

const CatalogCard = (props) => {
    const {title, description, price, img_url} = props.product
    const navigate = useNavigate()
    return (
        <div className={"catalog-card-wrapper"}>
            <div className={"catalog-card-img"} onClick={() => {
                navigate(`/Catalog/${props.product.id}`)
            }}>
                <img
                    alt={title}
                    src={`http://localhost:3001/public/${img_url}`}/>
            </div>
            <div className={"catalog-card-content"}>
                <div className="catalog-card-title">
                    <h5>{title}</h5>
                    <p>Количество - {props.product.quantity}</p>
                </div>
                <div className={"catalog-card-desc"}>
                    <span>{description}</span>
                </div>
                <div className={"catalog-card-actions"}>
                    <div>
                        {price} руб.
                    </div>
                    <div>
                        <button disabled={props.product.quantity <= 0} onClick={() => {
                            if (!props.isAdded) {
                                addToCart(props.product)
                                props.onAdd((prevState) => ([...prevState, props.product.id]))
                            }
                        }}>{props.isAdded ? "✓" : "В корзину"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogCard