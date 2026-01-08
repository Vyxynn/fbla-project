// frontend/src/components/Navbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

import westmecLogo from "../public/west-mec-logo.png";

function Navbar() {
    return (
        <nav>
            <div id="navbar">
                <NavLink to="/" id="logoHead">
                    <img src={westmecLogo} id="logo"></img>
                    West-MEC Lost and Found
                </NavLink>

                <ul>
                    {/* Home */}
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>

                    {/* About */}
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>

                    {/*Submit*/}
                    <li>
                        <NavLink to='/submit'>Submit</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
