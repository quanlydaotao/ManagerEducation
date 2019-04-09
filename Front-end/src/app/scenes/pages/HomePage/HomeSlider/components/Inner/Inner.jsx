import React, { Component } from 'react';
import styles from './style.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Inner extends Component {
    render() {
        const { banners } = this.props;
        let banner = banners.map((value, index) => {
            if (value.status === 1) {
                return (
                    <div key={index} className={(value.sort === 1) ? `carousel-item active` : `carousel-item`}>
                        <LazyLoadImage
                            alt={value.alt}
                            height={'100%'}
                            src={value.src} />
                    </div>
                );
            }
        });
        return (
            <div className="carousel-inner" role="listbox">
                { banner }
            </div>
        )
    }
}

export default Inner;