import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';
import user from '../../../Images/profile.png';
import bag from '../../../Images/shopping-bag.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const MENU = [
        {
            title: "Home",
            link: '#',
            key: "home"
        },
        {
            title: "Products",
            link: '#',
            key: "products"
        },
        {
            title: "About Us",
            link: "#",
            key: "aboutus"
        },
        {
            title: "Contact Us",
            link: "#",
            key: "contactus"
        },

        {
            title: <img src={bag} style={{ height: "30px", width: "30px", marginTop: "-10px" }} alt="bag" />,
            link: "#",
            key: "bag"
        },
        {
            title: <img src={user} style={{ height: "30px", width: "30px", marginTop: "-10px" }} alt="user" />,
            link: "#",
            key: "user"
        }
    ]
    const handleOnClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    return (
        <>
            <nav>
                <div className='logo'>
                    Shoppy Online
                </div>
                <ul className='desktop-menu'>
                    {
                        MENU.map((menuItem) => {
                            return (
                                <li key={menuItem.key}><Link to={menuItem.link}>{menuItem.title}</Link></li>
                            );

                        })
                    }
                </ul>
                {isMobileMenuOpen ? <FontAwesomeIcon icon={faXmark} className="mobile-menu-button" onClick={handleOnClick} /> : <FontAwesomeIcon icon={faBars} className="mobile-menu-button" onClick={handleOnClick} />}
                {isMobileMenuOpen ? <ul className='mobile-menu'>
                    {
                        MENU.map((menuItem) => {
                            return (
                                <li key={menuItem.key}><Link to={menuItem.link}>{menuItem.title}</Link></li>
                            );

                        })
                    }
                </ul> : ''}

            </nav>
        </>
    )
}

export default Header
