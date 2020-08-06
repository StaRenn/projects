import {Route, Switch, Redirect} from "react-router-dom";
import React from 'react';
import {PageBuilder} from "../components/PageBuilder";
import {MainPageContent} from "../components/MainPageContent";

export const Search = () => {

    const getMainPage = ({match}) => {
        const {id} = match.params;
        const {page} = match.params;
        if(id && !page) return <Redirect to={`/search/${id}/1`} />
        return <PageBuilder id = {id} page = {page} component={MainPageContent}/>
    }

    return(
        <Switch>
            <Route path={"/search/:id/:page"} render = {getMainPage} exact/>
            <Route path={"/search/:id"} render = {getMainPage} exact/>
            <Route path={"/search"} render={getMainPage} exact />
            <Redirect to={"/search"} />
        </Switch>
    )

}