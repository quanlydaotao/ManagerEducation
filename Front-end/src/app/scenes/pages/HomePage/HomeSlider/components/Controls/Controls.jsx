import React from 'react';
import styles from './style.css';

const Controls = () => {
    return (
        <React.Fragment>
            <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </React.Fragment>
    )
}

export default Controls;
