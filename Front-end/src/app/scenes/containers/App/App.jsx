import React, { Component } from 'react';
import styles from './style.css';
import { LoginWrapper } from '../LoginWrapper';
import { PageWrapperAdmin } from '../PageWrapperAdmin';
import routes from "../../../routes";

class App extends Component {

    render() {
        return (
            <div className={`${styles.wrapper}`}>
                {/* <LoginWrapper /> */}
                <PageWrapperAdmin />
            </div>
        );
    }
}

export default App;




