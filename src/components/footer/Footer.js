import MapComponent from "./Map";


const Footer = () => {
    return (
        <footer style={{fontFamily: 'Podkova', display:'flex', backgroundColor: 'lightgray'}}>
            <div style={{marginLeft: "5%", marginTop:"15px", marginBottom: "15px"}}>
                <MapComponent/>
            </div>
            <div className="footer-column" style={{marginLeft: "15%", marginTop:"15px"}}>
                <h3>Контакты</h3>
                <p>Город Владимир</p>
                <p>Почта: bestfarm33@mail.ru</p>
                <p>Телефон: 8(930)-031-49-89</p>
            </div>
            <div className="footer-column" style={{marginLeft: "80px", marginTop:"15px"}}>
                <h3>График работы</h3>
                <p>Понедельник-пятница 9:00-19:00</p>
                <p>Суббота-воскресенье выходной</p>
            </div>
            <div className="footer-column" style={{marginLeft: "80px", marginTop:"15px"}}>
                <h3>Продукция</h3>
                <p style={{width: "200px"}}>
                    Со всей нашей продукцией вы можете
                    ознакомиться, зарегистрировавшись на сайте 
                    или связавшись с нами
                    с помошью оставленных на сайте реквизитов
                </p>
            </div>
        </footer>
    );
};
export default Footer