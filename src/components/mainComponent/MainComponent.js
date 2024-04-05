import {StyledForm} from "./MainComponent.style";
import FormReport from "./MainComponentV2";
import HeaderComponent from "../headerComponents/HeaderComponent";
import React from "react";
import {Link} from "react-router-dom";
import AnimalList from "./AnimalList";


const MainComponent = () => {
    return (
        <div>
            <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '3%'}}>Учет скота</h2>
            <StyledForm>
                <FormReport/>
            </StyledForm>
            <div style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                <button style={{
                    marginTop: '2%',
                    marginBottom: '1%',
                    marginRight: '5%',
                    marginLeft: '5%',
                    color: 'white',
                    background: 'saddlebrown',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '20px',
                    padding: '10px 15px 10px 15px'
                }}><Link to={'/Table'} style={{textDecoration: "none", color: "white"}}>Таблица</Link></button>
                <button style={{
                    marginTop: '2%',
                    marginBottom: '1%',
                    marginRight: '5%',
                    marginLeft: '5%',
                    color: 'white',
                    background: 'saddlebrown',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '20px',
                    padding: '10px 15px 10px 15px'
                }}><Link to={'/Otchet'} style={{textDecoration: "none", color: "white"}}>Отчет</Link></button>
            </div>
            <AnimalList style={{marginBottom: '5%'}}/>
        </div>
    )
        ;
}

export default MainComponent;