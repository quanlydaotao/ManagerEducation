import React, { Component } from 'react';
import styles from './styles.css';
import { HomeAdmin } from '../../pages/HomeAdmin';
import { Header } from '../../components/Header';
import { VerticalMenuAdmin } from '../../components/Menu/VerticalMenuAdmin';
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import routes from '../../../routes';
import { NavLink, Route, Switch } from 'react-router-dom';

class PageWrapperAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={`${styles.main} container-fluid`} style={{ paddingLeft: 5 }}>
                    <div className="row">
                        <div className="col-md-2">
                            <VerticalMenuAdmin />
                        </div>
                        <div className="col-md-10">
                            {
                                routes.map(route => (
                                    <Route key={route.path} {...route} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PageWrapperAdmin;
