import {createPortal} from "react-dom";
import "./verifyModal.css"
import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

const modalRootElement = document.querySelector('#portal')

const VerifyModal = (props) => {
    const {curUser} = useSelector(state => state)
    const [error, setError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const ref = useRef();

    const createOrder = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/create-order", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    order: localStorage.getItem("farm-cart"),
                    password: inputValue,
                    user_id: curUser.id
                },),
                credentials: "include"
            })
            setInputValue("")
            if (response.ok) {
                localStorage.setItem("farm-cart", "[]")
                setError("")
                props.onOrder()
                props.onClose()
            } else {
                setError("Неправильный пароль")
            }
        } catch (e) {
        }
    }, [curUser, inputValue])

    useEffect(() => {
        const checkOutside = (e) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                setError("")
                props.onClose && props.onClose();
            }
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [props.onClose]);

    return createPortal(<>
        {props.isOpen && <div className={"verify-modal-wrapper"}>
            <div ref={ref} className={"verify-modal-block"}>
                <div>
                    <h1>
                        Подтвердите пароль
                    </h1>
                </div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    className={'verify-modal-input'}/>
                <div className={'verify-modal-error'}>
                    {error}
                </div>
                <button disabled={inputValue.length === 0} onClick={() => createOrder()}>Оформить заказ</button>
            </div>
        </div>}
    </>, modalRootElement)
}

export default VerifyModal