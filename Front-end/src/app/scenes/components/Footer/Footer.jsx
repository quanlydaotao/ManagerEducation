import React from 'react';
import styles from './style.css';
import { Contact } from './components/Contact';
import { Support } from './components/Support';
import { Socials } from './components/Socials';

const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className="container wrapContent">
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <Contact />
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <Support />
                    </div>
                    <div className="col-xs-12 col-sm-3">
                        <Socials />
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;