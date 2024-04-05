
import "../allOrders/allOrdersStyle.css"
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AdminCatalog = ({onSelect}) => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/products`);
        const json = await response.json();
        json.sort((a, b) => {
            return a.id - b.id
        })
        setProducts(json)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            <button onClick={() => onSelect(undefined)}>Добавить товар +</button>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Фото</th>
                    <th>Название</th>
                    <th>Количество</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) =>
                    <tr onClick={() => onSelect(product)} key={product.id}>
                        <td>{product.id}</td>
                        <td><img src={`http://localhost:3001/public/${product.img_url}`} alt={product.title}/></td>
                        <td>{product.title}</td>
                        <td>{product.quantity}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default AdminCatalog