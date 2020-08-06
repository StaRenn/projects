import React, {useState} from 'react';
import {Link} from "react-router-dom";

export const MainPage = () => {

    return(
        <div className="main-page">
            <div className="main-page__welcome-block">
                <p className="main-page__welcome-block__text">
                    Welcome to the <a href={"https://github.com/StaRenn"}>StaRen's</a> news searching service
                </p>
                <Link className={"main-page__welcome-block__get-started action-button"} to={localStorage.getItem("authorized") ? "/news": "login"}>Get Started</Link>
            </div>
        </div>
    )

}