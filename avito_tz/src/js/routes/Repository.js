import {Route, Switch, Redirect} from "react-router-dom";
import React from 'react';
import {PageBuilder} from "../components/PageBuilder";
import {RepositoryPage} from "../components/RepositoryPage";

export const Repository = () => {

    const getRepositoryPage = ({match}) => {
        const {id} = match.params;
        return <PageBuilder id = {id} component={RepositoryPage}/>
    }

    return(
        <Switch>
            <Route path={"/repository/:id"} render = {getRepositoryPage} exact/>
            <Redirect to={"/search"} />
        </Switch>
    )

}