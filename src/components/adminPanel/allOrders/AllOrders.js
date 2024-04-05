import "./allOrdersStyle.css"
import {useCallback, useEffect, useState} from "react";


const AllOrders = () => {
    const [orders, setOrders] = useState([])

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/all-orders`)
        const respOrders = await response.json()
        respOrders.sort((a, b) => {
            return Date.parse(b.stamp) - Date.parse(a.stamp)
        })
        setOrders(respOrders)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const acceptOrder = useCallback(async (id) => {
        await fetch('http://localhost:3001/accept-order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: id
            }),
            credentials: "include"
        })
    }, [])

    const cancelOrder = useCallback(async (id) => {
        await fetch('http://localhost:3001/admin-cancel-order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: id
            }),
            credentials: "include"
        })
    }, [])

    return (
        <table className={'table'}>
            <thead>
            <tr>
                <th>id</th>
                <th>Дата</th>
                <th>Имя</th>
                <th>Статус</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) =>
                <tr key={order.order_id}>
                    <td>
                        {order.order_id}
                    </td>
                    <td>
                        {new Date(order.stamp).toLocaleTimeString()} {new Date(order.stamp).toLocaleDateString()}
                    </td>
                    <td>
                        {order.name}
                    </td>
                    <td>
                        {order.status}
                    </td>
                    <td>
                        {order.status === "Обработка" && <>
                            <button onClick={async () => cancelOrder(order.order_id).then(() => fetchData())}
                                    style={{marginRight: '0.5rem'}}>
                                ×
                            </button>
                            <button onClick={async () => acceptOrder(order.order_id).then(() => fetchData())}>
                                ✓
                            </button>
                        </>}
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default AllOrders