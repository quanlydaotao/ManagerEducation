import React, { Component } from 'react';
import styles from './style.css';
import styled from 'styled-components';
import { LogoShop } from '../../../../../components/LogoShop';
import { MenuTop } from './components/MenuTop';
import { Search } from './components/Search';
import { IconBar } from './components/IconBar';
const Container = styled.div`{
    color: #313132 !important;
    text-transform: uppercase;
    line-height: 100%;
}`;

class ShopHeaderTop extends Component {

    render() {
        return (
            <div className={`${styles.headerTop}`}>
                <Container className={`container wrapContent`}>
                    <div className={`row`}>
                        <div className={`col-md-5`}>
                            <ul>
                                <MenuTop />
                            </ul>
                        </div>
                        <div className={`col-md-2`} style={{ textAlign: "center" }}>
                            <LogoShop />
                        </div>
                        <div className={`col-md-5`}>
                            <ul style={{ float: "right"}} className="wrapIcon">
                                <Search />
                                <IconBar idIcon="icCard" />
                                <IconBar idIcon="icUser" />
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ShopHeaderTop;