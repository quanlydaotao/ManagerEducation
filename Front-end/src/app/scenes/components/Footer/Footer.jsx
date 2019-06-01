import React, { Component } from 'react';
import styles from './styles.css';

class Footer extends Component {
    render() {
        return (
            <footer className={`${styles.footerWrap}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <h3>GIỚI THIỆU HỆ THỐNG</h3>
                            <div className={`${styles.footerLogo}`}><img src="http://hassandesigns.top/html/classified/images/footer-logo.png" alt /></div>
                            <p>Integer ac lorem sit amet est rhoncus dapi bus don cad pede acus morbi elit nunc molestie at ultrices eu eleifen lorem ut dictum erat masa... <a href="about-us.html">Read More</a></p>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <h3>LIÊN KẾT CHÍNH</h3>
                            <ul className={`${styles.footerLinks}`}>
                                <li><a href="#.">Trang chủ</a></li>
                                <li><a href="#.">Quản lý tài khoản</a></li>
                                <li><a href="#.">Quản lý lớp học</a></li>
                                <li><a href="#.">Thay đổi mật khẩu</a></li>
                                <li><a href="#.">Quản lý học phí</a></li>
                                <li><a href="#.">Quản lý tin nhắn</a></li>
                                <li><a href="#.">Quản lý popup</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h3>DANH MỤC CHÍNH</h3>
                            <ul className={`${styles.footerCategory}`}>
                                <li><a href="#.">Electronics</a></li>
                                <li><a href="#.">Vahicles</a></li>
                                <li><a href="#.">Bikes</a></li>
                                <li><a href="#.">Animals</a></li>
                                <li><a href="#.">Toys</a></li>
                                <li><a href="#."> Furniture</a></li>
                                <li><a href="#.">Marketing</a></li>
                                <li><a href="#.">Technology</a></li>
                            </ul>
                            <div className="clearfix" />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h3>LIÊN HỆ</h3>
                            <div className="mapouter"><div className="gmap_canvas"><iframe width={300} height={200} id="gmap_canvas" src="https://maps.google.com/maps?q=Hoc%20vien%20k%E1%BB%B9%20thu%E1%BA%ADt%20m%E1%BA%ADt%20m%C3%A3&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />Google Maps Generator by <a href="https://www.embedgooglemap.net">embedgooglemap.net</a></div><style dangerouslySetInnerHTML={{ __html: ".mapouter{position:relative;text-align:right;height:200px;width:300px;}.gmap_canvas {overflow:hidden;background:none!important;height:200px;width:300px;}" }} /></div>
                        </div>
                    </div>
                    <div className="copyright" style={{color: '#fff', paddingBottom: '5px'}}>Bản quyền thuộc về Đào Huy Đức - AT130913-ACTVN</div>
                </div>
            </footer>
        );
    }
}

export default Footer;