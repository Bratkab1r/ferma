import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import korovi from '../imges/korovi.jpg'
import barani from '../imges/barani.jpg'
import petuxi from '../imges/petuxi.jpg'

function IndividualIntervalsExample() {
    return (
        <Carousel style={{height: "600px"}}>
            <Carousel.Item interval={1000}>
                <img style={{width: '100%', height: '600px'}}
                    className="d-block w-100"
                    src={barani}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img style={{width: '100%', height: '600px'}}
                    className="d-block w-80"
                    src={korovi}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img style={{width: '100%', height: '600px'}}
                    className="d-block w-80"
                    src={petuxi}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default IndividualIntervalsExample;