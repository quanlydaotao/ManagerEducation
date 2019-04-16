import React, { Component } from 'react';
import styles from './styles.css';

class Breadcumbs extends Component {
    render() {
        return (
            <div className={`${styles.breadcums} clearfix`}>
                <div className={`${styles.imgBreadcumb}`}>
                    <img style={{ marginTop: 2, marginRight: 15 }} src="https://image.flaticon.com/icons/svg/1055/1055686.svg" alt="aaa" />
                </div>
                <div className={`${styles.mainBreadcums}`}>
                    <h1>{ this.props.breadcums }</h1>
                    <span>Hà nội : 02/04/2019 GMT +7 20:50 PM</span>
               </div>
            </div>
        );
    }
}

export default Breadcumbs;