import React from 'react';
import PropTypes from 'prop-types';
import {HeaderSearchForm} from "./HeaderSearchForm";

export const PageBuilder = (props) => {

    const Component = props.component;
    const id = props.id || "";

    return(
        <main>
            <HeaderSearchForm id ={id}/>
            <Component {...props} key={props.id} />
        </main>
    )
}

PageBuilder.propTypes = {
    component: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}