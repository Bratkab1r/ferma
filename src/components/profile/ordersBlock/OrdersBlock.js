import "./ordersBlock.css"
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../../page/cart/Cart";
import ReviewModal from "../../reviewModal/ReviewModal";

const OrdersBlock = () => {
    const {curUser} = useSelector(state => state)
    const [orders, setOrders] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(undefined)
    const [selectedOrder, setSelectedOrder] = useState(undefined)

    const fetchData = useCallback(async() => {
        if (curUser.id) {
            const response = await fetch(`http://localhost:3001/orders/${curUser.id}`)
            const respOrders = await response.json()
            respOrders.sort((a, b) => {
                return Date.parse(b.stamp) - Date.parse(a.stamp)
            })
            setOrders(respOrders)
        }
    }, [curUser])

    const cancelOrder = useCallback(async(id) => {
        if (curUser.id) {
            await fetch('http://localhost:3001/cancel-order', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id: id
                }),
                credentials: "include"
            })
        }
    }, [curUser])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div>
            <ReviewModal isOpen={isOpen} onClose={() => setOpen(false)} orderId={selectedOrder} productId={selectedProduct}
                         onSuccess={fetchData}/>
            <h1>
                Заказы
            </h1>
            <div>
                {orders.map((order, i) => <div className={"order-entity-wrapper"} key={i}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h3>{order.title}</h3>
                        {(order.status === "Обработка") &&
                            <button onClick={() => {
                                cancelOrder(order.order_id).then(() => fetchData())
                            }}>Отменить</button>}
                    </div>
                    <p>Статус - {order.status}</p>
                    <p>{new Date(order.stamp).toLocaleDateString()} {new Date(order.stamp).toLocaleTimeString()}</p>
                    <h5>Детали заказа</h5>
                    <div>
                        {order.order_json.map((pr, i) => <div className={"cart-entity-wrapper"} key={i}>
                            <div className={"cart-entity-img"}>
                                <img src={`http://localhost:3001/public/${pr.img_url}`}/>
                            </div>
                            <div className={"cart-entity-content"}>
                                <h4>{pr.title}</h4>
                                <p>Количество - {pr.selected_quantity}</p>
                                {(order.status !== "Готов к выдаче") && (!pr.review) ? null : (pr.review) ? "Спасибо за отзыв!" : <button onClick={() => {
                                    setSelectedOrder(order.order_id)
                                    setSelectedProduct(pr.id)
                                    setOpen(true)
                                }}>Оставить отзыв</button>}
                            </div>
                            <div className={"cart-entity-sub"}>
                                {pr.price * pr.selected_quantity} руб.
                            </div>
                        </div>)}
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default OrdersBlock