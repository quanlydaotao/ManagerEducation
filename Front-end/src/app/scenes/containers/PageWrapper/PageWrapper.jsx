import React, { Component } from 'react';
import styles from './style.css';
import { Route } from "react-router-dom";
import routes from '../../../routes'
import { ShopHeader } from './ShopHeader';
import { Footer } from '../../components/Footer';

class PageWrapper extends Component {
    
    render() {
        return (
            <React.Fragment>
                <ShopHeader />
                <section className="content">
                    {
                        routes.map(route => (
                            <Route key={route.path} {...route} />
                        ))
                    }
                </section>
                <Footer />
            </React.Fragment>
        );
    }
}

export default PageWrapper;