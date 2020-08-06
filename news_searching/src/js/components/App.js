import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react';
import {MainPage} from "../pages/MainPage";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {LoginPage} from "../pages/LoginPage";
import {ProfilePage} from "../pages/ProfilePage";
import {NavBar} from "./NavBar";
import {NewsRoute} from "../routes/news";

export const App = () => {

    return(
        <Router>
            <Route path={["/profile", "/news"]} component={NavBar} />
            <Route render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={{
                        enter: 1000,
                        exit: 500,
                    }}>
                        <Switch key={location.key} location={location}>
                            <Route path={"/login"} exact component={LoginPage}/>
                            <Route path={"/news"} component={NewsRoute}/>
                            <Route path={"/profile"} exact component={ProfilePage}/>
                            <Route path={"/"} exact component={MainPage}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                )}/>
        </Router>
    )
}