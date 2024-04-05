import './productReviews.css'

const ProductReviews = (props) => {
    const {reviews} = props
    return (
        <div className={'product-reviews-wrapper'}>
            <h2>Отзывы</h2> <span>(чтобы оставить отзыв, сделайте заказ и оставьте отзыв в личном кабинете)</span>
            <hr/>
            {(reviews.length <= 0) && <div>Отзывов пока нет</div>}
            {reviews.map(({review_id, rating, review, product_id, stamp, name}) =>
                <div className={"review-entity-wrapper"} key={review_id}>
                    <div className={"review-entity-header"}>
                        <div style={{display: "flex", alignItems: 'center'}}>
                            <h5>{name ? name : "Неизвестный"}</h5>
                            <span style={{
                                paddingLeft: 10,
                                marginTop: "-5px",
                                opacity: 0.5
                            }}>{new Date(stamp).toLocaleDateString()} {new Date(stamp).toLocaleTimeString()}</span>
                        </div>
                        <div>Оценка - {rating}/5</div>
                    </div>
                    <div className={"review-entity-content"}>
                        {review}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductReviews