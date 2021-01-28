import React from "react";
import { Link } from "react-router-dom";
import * as loginService from "services/loginService";
import { connect } from "react-redux";
import store from "store";

import "./styles.css";

const Nav = ({ loggedUser }) => {
    return (
        <nav
            id="navbar"
            className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        >
            {/* navbar-brand */}
            <Link className="navbar-brand" to="/">
                {store.getState().defaultState.appTitle}
            </Link>

            {navButtonCollapse()}

            <div className="collapse navbar-collapse" id="deliveryNavibar">
                {!!loggedUser && ( 
                    <>
                    <NavContent />
                    {navLoggedUser(loggedUser)} 
                    </>
                )};
            </div>
        </nav>
    );
};

//////////////////////////////////////////////////////////////////
const navButtonCollapse = () => {
    return (
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#deliveryNavibar"
            aria-controls="deliveryNavibar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
    );
};

//////////////////////////////////////////////////////////////////
const NavContent = () => {
    return (
        <ul
            className="navbar-address mr-auto"
            style={{ listStyle: "none", fontSize: 26, height: 10, marginBottom: 35 }}
        >

            <li className="nav-item dropdown">
                <a 
                    className="nav--link dropdown-toggle" 
                    style={{ color: "yellow", textDecoration: "none" }}
                    href="/" 
                    id="navbarDropdown" 
                    role="button" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    Opções
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a 
                        className="dropdown-item" 
                        style={{ fontWeight: "bold", color: "blue", fontSize: "1.1rem" }}
                        href="/add/incluir" 
                    >
                        Incluir Chamado
                    </a>

                    <div className="dropdown-divider"></div>

                    <a 
                        className="dropdown-item" 
                        style={{ fontWeight: "bold", color: "blue", fontSize: "1.1rem" }}
                        href="/clientes-form" 
                    >
                        Incluir Cliente
                    </a>

                    <div className="dropdown-divider"></div>

                    <div 
                        className="dropdown-item" 
                        style={{ cursor: "pointer", fontWeight: "bold", color: "maroon", fontSize: "1.4rem" }}
                        onClick={() => {
                            loginService.logout();
                        }}
                    >
                        Sair
                    </div>
                </div>
            </li>

        </ul>
    );

};

//////////////////////////////////////////////////////////////////
const navLoggedUser = (loggedUser) => {
    return (
        <div
            className="logged-user text-light"
            style={{ marginLeft: 22, marginTop: 2 }}
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
        >
            <span>{loggedUser}</span>
            <button
                className="btn-logout ml-3"
                onClick={() => {
                    loginService.logout();
                }}
            >
                Sair
            </button>
        </div>
    );
};

//////////////////////////////////////////////////////////////////
export default connect((state) => ({
    loggedUser: state.loginState.loggedUser,
    // adminModule: state.defaultState.adminModule,
}))(Nav);
