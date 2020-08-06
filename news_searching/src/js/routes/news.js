import {Route, Switch} from "react-router-dom";
import React from 'react';
import {NewsPage} from "../pages/NewsPage";

export const NewsRoute = () => {

    const getNewsPage = ({match}) => {
        const {id} = match.params;
        return <NewsPage searchQuery = {id}/>
    }

    return(
        <Switch>
            <Route path={"/news/:id"} render = {getNewsPage} exact/>
            <Route path={"/news"} component = {NewsPage} exact/>
        </Switch>
    )

}