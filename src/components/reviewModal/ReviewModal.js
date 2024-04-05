import {createPortal} from "react-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import './reviewModal.css'
import {loginUser, setAuth} from "../../actions";
import {useSelector} from "react-redux";

const modalRootElement = document.querySelector('#portal')

const ReviewModal = (props) => {
    const {curUser} = useSelector(state => state)
    
    const [rate, setRate] = useState(0)
    const [review, setReview] = useState("")

    const {isOpen, onClose, productId, orderId, onSuccess} = props
    const ref = useRef(null)

    const sendReview = useCallback(async () => {
        const response = await fetch('http://localhost:3001/send-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                product_id: productId,
                order_id: orderId,
                review,
                rating: rate,
                name: curUser.name
            })
        });

        if (response.ok) {
            setRate(0)
            setReview("")
            onSuccess()
            onClose();
        }
    }, [curUser.name, onClose, onSuccess, orderId, productId, rate, review])

    useEffect(() => {
        const checkOutside = (e) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                onClose && onClose();
            }
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            setRate(0)
            setReview("")
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [onClose]);

    if (isOpen) return createPortal(
        <div className={'review-modal-wrapper'}>
            <div ref={ref} className={'review-modal-container'}>
                <h2>Оставить отзыв</h2>
                <div>
                    <div>
                        <label>Оценка - {rate}</label>
                    </div>
                    <input type={"range"} min={0} max={5} step={0.5} value={rate}
                           onChange={(e) => setRate(e.currentTarget.value)}/>
                </div>
                <div>
                    <div>
                        <label>Отзыв</label>
                    </div>
                    <input className={"review-modal-input"} type={"text"} min={0} max={5} step={0.5} value={review}
                           onChange={(e) => setReview(e.currentTarget.value)} placeholder={"Товар очень хороший..."}/>
                </div>
                <button disabled={(rate === 0) || (review.length <= 0)}
                        onClick={async () => await sendReview()}>Отправить
                </button>
            </div>
        </div>
        , modalRootElement)
}

export default ReviewModal