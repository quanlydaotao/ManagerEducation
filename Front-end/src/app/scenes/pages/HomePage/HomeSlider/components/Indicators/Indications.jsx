
import React, { Component } from 'react';
import styles from './style.css';

class Indications extends Component {
    render() {
        const { banners } = this.props;
        var count = 0;
        let target = banners.map((value, index) => {
            if(value.status === 1) {
                return <li key={index} data-target="#carouselId" data-slide-to={`${count++}`} className={count===0?`active`:``} />
            }
        });
        console.log(count);
        return (
            <ol className="carousel-indicators">
                {target}
            </ol>
        );
    }
}

export default Indications;
