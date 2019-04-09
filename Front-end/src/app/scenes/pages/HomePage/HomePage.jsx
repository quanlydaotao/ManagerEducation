import React, { Component } from 'react';
import styles from './style.css';
import { HomeSlider } from './HomeSlider'

class HomePage extends Component {
    render() {
        return (
            <div className={`${styles.homePage}`}>
                <HomeSlider />
            </div>
        );
    }
}

export default HomePage;