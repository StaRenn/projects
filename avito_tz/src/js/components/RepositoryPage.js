import React from 'react';
import PropTypes from 'prop-types';
import {useFetch, catchApiRateLimit} from "../helpers";
import ReactLoading from "react-loading";

export const RepositoryPage = (props) => {

    const {id} = props;
    const repositoryInfo = useFetch(`https://api.github.com/repositories/${id}`);
    const commitsList = useFetch(`https://api.github.com/repositories/${id}/commits`);
    const languages = useFetch(`https://api.github.com/repositories/${id}/languages`);
    const contributors = useFetch(`https://api.github.com/repositories/${id}/contributors`)

    const getLanguagesList = () => {
        if (Object.keys(languages).length === 0 || languages.message) {
            return <h3 className="repository__main-info__info-block__languages__language">No languages yet</h3>
        }
        return Object.keys(languages).map(key => {
            return <h3 className="repository__main-info__info-block__languages__language">{key}</h3>
        })
    }
    
    const getLastCommitDate = () => {
        if (commitsList.message) {
            return "No commits yet"
        }
        return `Last commit: ${(new Date(commitsList[0].commit.committer.date)).toDateString()}`
    }
    
    const getRepositoryDescription = () => {
        if (!repositoryInfo.description) return "No description yet"
        return repositoryInfo.description
    }

    const getTopContributors = () => {
        if (!contributors || contributors.message) {
            return <h3 className={"repository__main-info__info-block__contributors__no-contributors"}>No contributors yet</h3>
        }
        return (
            <div className="repository__main-info__info-block__contributors">
                <h3 className="repository__main-info__info-block__contributors__total">Top 10 contributors</h3>
                {contributors.slice(0,10).map(contributor => {
                    return <a
                        href={contributor.html_url}
                        className="repository__main-info__info-block__contributors__contributor-login"
                    >{contributor.login}</a>
                })}
            </div>
        )
    }
    
    const getBody = () => {

        const apiRateLimitExceeded = catchApiRateLimit(repositoryInfo)
        if(apiRateLimitExceeded) return apiRateLimitExceeded

        return(
            <div className={`repository-page`}>
                <div className="repository-page__card">
                    <div className="repository-page__card__info">
                        <h1 className="repository__title">{repositoryInfo.full_name}</h1>
                        <div className="repository__additional-info__repo-stats">
                            <h3 className="repository__additional-info__stars-amount">
                                <span className="repository__additional-info__stars-amount__span"/>
                                Stars: {repositoryInfo.stargazers_count}
                            </h3>
                            <h3 className="repository__additional-info__last-commit-date">
                                {getLastCommitDate()}
                            </h3>
                        </div>
                        <div className={"repository__main-info"}>
                            <div className="repository__main-info__profile">
                                <img className={"repository__main-info__profile__picture"} src={repositoryInfo.owner.avatar_url} alt={""}/>
                                <a href={repositoryInfo.owner.html_url} className={"repository__main-info__profile__owner"}>{repositoryInfo.owner.login}</a>
                            </div>
                            <div className="repository__main-info__info-block">
                                <div className="repository__main-info__info-block__languages">
                                    {getLanguagesList()}
                                </div>
                                <p className="repository__main-info__info-block__description">
                                    {getRepositoryDescription()}
                                </p>
                                {getTopContributors()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(repositoryInfo && commitsList && languages
        ? getBody()
        : <div className={"loading-screen"}>
            <ReactLoading type={"spinningBubbles"} color={"#24292E"} height={100} width={100} />
        </div>)
}

RepositoryPage.propTypes = {
    id: PropTypes.string.isRequired
}