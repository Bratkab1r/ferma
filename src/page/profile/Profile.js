import {useSelector} from "react-redux";
import OrdersBlock from "../../components/profile/ordersBlock/OrdersBlock";
import {useNavigate} from "react-router-dom";

const roleToString = (role) => {
    switch (role) {
        case "user":
            return "Пользователь";
        case "admin":
            return "Администратор";
        case "worker":
            return "Работник";
        default: return "Неизвестно"
    }
}

const Profile = () => {
    const {curUser} = useSelector(state => state)
    const navigate = useNavigate()
    return (
        <div className={"body-container"}>
            <h1>Личный кабинет</h1>
            <div>
                Имя: {curUser.name}
            </div>
            <div>
                Эл. почта: {curUser.email}
            </div>
            <div>
                Должность: {roleToString(curUser.role_name)}
            </div>
            {curUser.role_name === "admin" && <button onClick={() => navigate("/Admin-panel")}>
                Админ панель
            </button>}
            <OrdersBlock/>
        </div>
    )
}

export default Profile