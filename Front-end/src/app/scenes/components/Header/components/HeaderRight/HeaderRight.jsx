import React, { Component } from 'react';
import styles from './styles.css';
import { IconBar } from './IconBar';
import { IconRight } from './IconRight';

class HeaderRight extends Component {
    render() {
        const { md, sm, xs } = this.props;
        return (
            <div className={`col-md-${md} col-sm-${sm} col-xs-${xs}`} style={{ textAlign: "right" }}>
                <div className={`${styles.headerRight}`}>
                    <IconBar />
                    <IconRight />
                </div>
            </div>
        );
    }
}

export default HeaderRight;