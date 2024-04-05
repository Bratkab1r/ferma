import './productPage.css'
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductInfo from "../../components/productPage/productInfo/ProductInfo";
import ProductReviews from "../../components/productPage/productReviews/ProductReviews";


const ProductPage = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(undefined)
    const [reviews, setReviews] = useState(undefined)
    const fetchData = useCallback(async() => {
        if (id) {
            const response = await fetch(`http://localhost:3001/products/${id}`)
            const extractedProduct = await response.json()
            setProduct(extractedProduct)
            const reviewsResponse = await fetch(`http://localhost:3001/products/reviews/${id}`)
            const extractedReviews = await reviewsResponse.json()
            extractedReviews.sort((a, b) => {
                return Date.parse(b.stamp) - Date.parse(a.stamp)
            })
            setReviews(extractedReviews)
        }
    }, [id])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className={'body-container'}>
            {product && <>
                <ProductInfo product={product}/>
            </>}
            {reviews && <ProductReviews reviews={reviews}/>}
        </div>
    )
}

export default ProductPage