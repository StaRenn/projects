import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import HomePage from "./HomePage";
import TourDatesPage from "./TourDatesPage";
import VideoPage from "./VideoPage";
import MusicPage from "./MusicPage";
import Header from "./Header";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path = "/home" render = {this.renderPageAndUpdateHeader(HomePage, "home")}/>
                    <Route path = "/tourdates" render = {this.renderPageAndUpdateHeader(TourDatesPage, "tourdates")} />
                    <Route path = "/video" render = {this.renderPageAndUpdateHeader(VideoPage, "video")} />
                    <Route path = "/music" render = {this.renderPageAndUpdateHeader(MusicPage, "music")} />
                    <Redirect to={"/home"}/>
                </Switch>
            </Router>
        );
    }

    renderPageAndUpdateHeader = (Component, path) => () => {
        return(
            <div className={"wrapper"}>
                <Header activePage = {path}/>
                <Component />
            </div>
        )
    }
}

export default App;