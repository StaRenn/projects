import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from "react-router-dom";
import React from 'react';
import {Search} from "./routes/Search";
import {Repository} from "./routes/Repository"

export const Root = () => {

    return(
        <Router>
            <Switch>
                <Route path={"/search"} render={Search}/>
                <Route path={"/repository/:id"} render={Repository}/>
                <Redirect to={"/search"} />
            </Switch>
        </Router>
    )
}