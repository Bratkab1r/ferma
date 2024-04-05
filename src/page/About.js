import IndividualIntervalsExample from "../components/Glavnaya/Carousel";
import React from "react";
import ResponsiveExample from "../components/Glavnaya/GlavnayaT";
import Footer from "../components/footer/Footer";


const About = () => {
    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: '4%', marginBottom: '20px' }}>Страница информации</h2>
            <IndividualIntervalsExample/>
            <ResponsiveExample/>
            <Footer/>
        </div>

    )
}
export default About