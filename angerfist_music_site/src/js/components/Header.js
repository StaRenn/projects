import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

class Header extends Component {
    static propTypes = {
        activePage: PropTypes.string.isRequired
    };

    render() {
        const {activePage} = this.props;
        return (
            <header>
                <nav>
                    <span className="header__logo"/>
                    <div className="header__navigation">
                        <div className="header__navigation__links">
                            <NavLink
                                className={`header__navigation__links__link ${activePage === "home" ? "active" : "hidden"}`}
                                id="home"
                                to="/home"
                            >Home</NavLink>
                            <NavLink
                                className={`header__navigation__links__link ${activePage === "tourdates" ? "active" : "hidden"}`}
                                id="tours"
                                to="/tourdates"
                            >Tour dates</NavLink>
                            <NavLink
                                className={`header__navigation__links__link ${activePage === "video" ? "active" : "hidden"}`}
                                id="video"
                                to="/video"
                            >Video</NavLink>
                            <NavLink
                                className={`header__navigation__links__link ${activePage === "music" ? "active" : "hidden"}`}
                                id="music"
                                to="/music"
                            >Music</NavLink>
                        </div>
                        <div className="header__navigation__spans">
                            <span
                                className={`header__navigation__spans__outline ${activePage === "home" ? "active" : "hidden"}`}     >Home</span>
                            <span
                                className={`header__navigation__spans__outline ${activePage === "tourdates" ? "active" : "hidden"}`}>Tour dates</span>
                            <span
                                className={`header__navigation__spans__outline ${activePage === "video" ? "active" : "hidden"}`}    >Video</span>
                            <span
                                className={`header__navigation__spans__outline ${activePage === "music" ? "active" : "hidden"}`}    >Music</span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;