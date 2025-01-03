import React, { useState, useEffect } from 'react';
import Styles from './header.module.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Hook to handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ''}`}>
            {/* Logo and Web Name on the Left */}
            <div className={Styles.logoContainer}>
                <div className={Styles.logo}>CampusPay</div>
            </div>

            {/* Navigation Menu and Login Button on the Right */}
            <div className={Styles.navContainer}>
                <nav className={Styles.nav}>
                    <ul className={Styles.navList}>
                        <li className={Styles.navItem}><a href="#home" className={Styles.navLink}>Home</a></li>
                        <li className={Styles.navItem}><a href="#about" className={Styles.navLink}>About</a></li>
                        <li className={Styles.navItem}><a href="#features" className={Styles.navLink}>Features</a></li>
                        <li className={Styles.navItem}><a href="#contact" className={Styles.navLink}>Contact</a></li>
                        <li className={Styles.navItem}><a href="#login" className={Styles.navLink}><button className={Styles.loginButton}>Login</button></a></li>
                    </ul>
                </nav>
                {/* <button className={Styles.loginButton}>Login</button> */}
            </div>
        </header>
    );
}

export default Header;
