import React from 'react'
import playStore from '../../../Images/playstore.png';
import appStore from '../../../Images/Appstore.png';
import './Footer.css';
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appstore" />
            </div>
            <div className="midFooter">
                <h1>Shoppy Online</h1>
                <p>High Quality is our priority</p>
                <p>Copyrights 2023 &copy: Dharmik Rathod</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="/">Instagram</a>
                <a href="/">Linked In</a>
                <a href="/">Github</a>
            </div>
        </footer>
    )
}

export default Footer
