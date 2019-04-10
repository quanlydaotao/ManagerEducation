import React, { Component } from 'react';
import styles from './style.css';
import { LoginWrapper } from '../LoginWrapper'

class App extends Component {

    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <LoginWrapper />
            </div>
        );
    }
}

export default App;




