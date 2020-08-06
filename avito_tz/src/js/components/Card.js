import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {useFetch} from "../helpers";

export const Card = ({props}) => {

    const commitsList = useFetch(`${props.url}/commits`);
    const starsAmount = props.stargazers_count;
    const repositoryTitle = props.full_name;
    const repositoryLink = props.html_url;
    const repositoryId = props.id

    return(
        <div className="main-page__repository-list__card">
            <Link to={`/repository/${repositoryId}`} className="repository__title">{repositoryTitle}</Link>
            <div className="repository__additional-info__repo-stats">
                <h3 className="repository__additional-info__stars-amount">
                    <span className="repository__additional-info__stars-amount__span"/>
                     Stars: {starsAmount}
                </h3>
                <h3 className="repository__additional-info__last-commit-date">
                    {commitsList && !commitsList.message
                    ? `Last commit: ${(new Date(commitsList[0].commit.committer.date)).toDateString()}`
                    : ""}
                </h3>
            </div>
            <a href={repositoryLink} className="main-page__repository-list__card__repository-link">{repositoryLink}</a>
        </div>
    )
}

Card.propTypes = {
    props: PropTypes.shape = {
        stargazers_count: PropTypes.number.isRequired,
        full_name: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }
}