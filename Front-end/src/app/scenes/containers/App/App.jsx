import React, { Component } from 'react';
import styles from './style.css';
import { PageWrapper } from '../PageWrapper';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => this.setState({ loading: false }));
    }

    render() {
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return null; // render null when app is not ready
        }
        return (
            <div className={`${styles.wrapper}`}>
                <PageWrapper />
            </div>
        );
    }
}

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default App;




