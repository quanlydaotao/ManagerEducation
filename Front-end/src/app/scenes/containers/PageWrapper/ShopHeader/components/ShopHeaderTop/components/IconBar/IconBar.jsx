import React, { Component } from 'react';
import styles from './style.css';
import styled from 'styled-components';

class IconBar extends Component {
    render() {
        return (
            <li>
                <a href="javascript:void(0)" id={this.props.idIcon}></a>
            </li>
        );
    }
}

export default IconBar;
