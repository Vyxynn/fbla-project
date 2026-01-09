// frontend/src/pages/Admin.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import { handleLogin } from "../scripts/adminLogin.js";

function Admin() {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        handleLogin(e, navigate);
    };

    return (
        <div id="admin-login-container">
            <h2>Admin Login</h2>

            <form id="admin-login-form" onSubmit={onSubmit}>
                <div class="admin-login-form-question">
                    <label for="admin-password">Password:</label>
                    <input
                        type="password"
                        placeholder="password"
                        id="admin-password"
                        name="admin-password"
                    ></input>
                </div>

                <div class="admin-login-form-question">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;
