import './App.css';
import MainComponent from "./components/mainComponent/MainComponent";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Table from "./page/Table"
import Otchet from "./page/Otchet"
import About from "./page/About";
import Catalog from "./page/catalog/Catalog";
import HeaderComponent from "./components/headerComponents/HeaderComponent";
import React, {useEffect} from "react";
import {checkAuth, loginUser, setAuth} from "./actions";
import {useDispatch} from "react-redux";
import Profile from "./page/profile/Profile";
import Cart from "./page/cart/Cart";
import ProductPage from "./page/productPage/ProductPage";
import AdminPanel from "./page/adminPanel/AdminPanel";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth().then(data => {
                dispatch(setAuth(true))
                dispatch(loginUser(data.user))
            })
        }
        if (!localStorage.getItem('farm-cart')) {
            localStorage.setItem('farm-cart', "[]")
        }
    }, [])
    return (
        <div>
            <Router>
                <div>
                    <HeaderComponent/>
                    <Routes>
                        <Route exact path='/' element={<About/>}></Route>
                        <Route path='/Table' element={<Table/>}/>
                        <Route path='/Otchet' element={<Otchet/>}/>
                        <Route path='/Forma' element={<MainComponent/>}/>
                        <Route path='/Catalog' element={<Catalog/>}/>
                        <Route path='/Catalog/:id' element={<ProductPage/>}/>
                        <Route path='/Cart' element={<Cart/>}/>
                        <Route path='/Profile' element={<Profile/>}/>
                        <Route path='/Admin-panel' element={<AdminPanel/>}/>
                    </Routes>
                </div>
            </Router>
        </div>

    );
}

export default App;