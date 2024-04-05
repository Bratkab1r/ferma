import React from "react";

const MapComponent = () => {
    return (
        <div className="App">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142240.27187883336!2d40.282715706983936!3d56.148385730669354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414c796abd574431%3A0xa5192737744ddb02!2z0JLQu9Cw0LTQuNC80LjRgCwg0JLQu9Cw0LTQuNC80LjRgNGB0LrQsNGPINC-0LHQuy4!5e0!3m2!1sru!2sru!4v1675047295952!5m2!1sru!2sru"
                width="250"
                height="200"
                frameborder="0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
            ></iframe>
        </div>
    );
};

export default MapComponent;