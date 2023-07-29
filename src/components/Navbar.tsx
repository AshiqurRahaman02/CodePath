// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import codepathLogo from "../assets/codepath-logo.png"
import logo from "../assets/logo.svg"
import profileImage from "../assets/nav-profile-image.svg"
import { Link } from 'react-router-dom';
import "../styles/Nav.css"
import "../styles/root.css"

const Navbar: React.FC = () => {
    const [userDetails, setUserDetails] = useState<any | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userInfo');
        if (userDetails !== null) {
            const parsedUserDetails = JSON.parse(userDetails);
            setUserDetails(parsedUserDetails);
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false)
        }

    }, []);

    return (
        <nav>
            <h1><img src={codepathLogo} alt="" id='codepathLogo' /><span id='name'>{`{Code}`}Path</span></h1>
            <img src={logo} className="App-logo" alt="logo" />
            {!isAuthenticated ? (

                <Link to="/signin"><button  className='navButton'><img src={profileImage} alt="" /><span>Sign In</span></button></Link>
            ) : (
                <Link to="/account"><button  className='navButton'><img src={profileImage} alt="" /><span>{userDetails?.name[0].toUpperCase() + userDetails?.name.slice(1)}</span></button></Link>
            )}

        </nav>
    );
};

export default Navbar;
