import {Button, Container, Logo, Myaccount} from "./HeaderComponent.style";
import logo from '../imges/logo.png'
import account from '../imges/account.svg'
import {useState} from "react";
import Modal from "../Modal/Modal";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setAuth} from "../../actions";



const HeaderComponent = () => {
    const {curUser, isAuth} = useSelector(state => state)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOpenModal = () => {
        setIsOpen(true);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <Container>
                <Link to={'/'}>
                <Logo src={logo}/>
                </Link>
                <ul style={{display: 'flex',
                    justifyContent: 'center',
                    alightItems: 'center'}}>
                    {((curUser.role_name !== "user") && (isAuth)) ? <>
                        <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/Forma'}
                                                                                                       style={{
                                                                                                           textDecoration: "none",
                                                                                                           color: "black"
                                                                                                       }}>Сотрудникам</Link>
                        </li>
                        <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/Table'}
                                                                                                       style={{
                                                                                                           textDecoration: "none",
                                                                                                           color: "black"
                                                                                                       }}>Руководителям</Link>
                        </li>
                    </> : null}
                    <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/'} style={{
                        textDecoration: "none",
                        color: "black"
                    }}>Посетителям</Link></li>
                    <li style={{listStyleType: 'none', marginLeft: '5%', marginRight: '5%'}}><Link to={'/catalog'}
                                                                                                   style={{
                                                                                                       textDecoration: "none",
                                                                                                       color: "black"
                                                                                                   }}>Каталог</Link></li>
                </ul>
                {isAuth ? <div>
                    <Link to={"/Profile"} style={{paddingRight: "10px", textDecoration: "none"}}>Ваш профиль, {curUser.name}</Link>
                    <Link to={"/Cart"} style={{paddingRight: "10px", textDecoration: "none", color: "black"}}>Корзина</Link>
                    <button onClick={async () => {
                        await fetch("http://localhost:3001/logout", {method: "POST", credentials: "include"})
                        localStorage.removeItem('token')
                        dispatch(setAuth(false))
                        dispatch(loginUser({}))
                        navigate("/")
                    }}>Выйти</button>
                </div> : <Button onClick={handleOpenModal}><Myaccount src={account}/></Button>}
                {isOpen && <Modal open={isOpen} onClose={handleCloseModal}/>}
            </Container>
        </div>
    )
}

export default HeaderComponent;