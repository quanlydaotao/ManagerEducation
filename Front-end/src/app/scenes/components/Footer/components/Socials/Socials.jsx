import React from 'react';
import styles from './style.css';
import styled from 'styled-components';
const LiInfo = styled.li`{
    margin-bottom: 1rem;
}`

const Socials = () => {
    return (
        <div className={`footer-section ${styles.social}`}>
            <h2 className="footer-title">
                FOLLOW HANH TIEN SILK
            </h2>
            <div className="info">
                <ul>
                    <LiInfo >
                        <a href="#">
                            <i className="fa fa-facebook-square" />&nbsp;&nbsp;Facebook
                        </a>
                    </LiInfo >
                    <LiInfo >
                        <a href="#">
                            <i className="fa fa-youtube" />&nbsp;Youtube
                        </a>
                    </LiInfo >
                    <LiInfo >
                        <a href="#">
                            <i className="fa fa-instagram" />&nbsp;&nbsp;Instagram
                        </a>
                    </LiInfo >
                    <LiInfo >
                        <a href="#" style={{display: 'inline-block'}}>
                            <img alt="Đã thông báo Bộ Công Thương" title="Đã thông báo Bộ Công Thương" src="https://dchic.vn/images/dathongbao-bocongthuong.png" style={{ width: '50%', float: 'left', maxWidth: '100%', marginTop: 15}} />
                        </a>
                    </LiInfo >
                </ul>
            </div>
        </div>
    )
}

export default Socials;