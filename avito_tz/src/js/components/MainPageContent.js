import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import ReactLoading from 'react-loading';
import PropTypes from "prop-types";
import {catchApiRateLimit, useFetch} from "../helpers";
import Pagination from "rc-pagination";
import {Card} from "./Card";

export const MainPageContent = (props) => {

    const [isPageLoading, setIsPageLoading] = useState(false)

    const history = useHistory()
    const {id, page} = props;
    const repositories = id
            ? useFetch(`https://api.github.com/search/repositories?q=${id}&page=${page}&per_page=10`)
            : useFetch(`https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&per_page=10`)

    useEffect(() => {
        repositories ? setIsPageLoading(false) : null;
    }, [repositories])

    const handlePageChange = (id) => (page) => {
        history.push(`/search/${id}/${page}`);
        setIsPageLoading(true)
    }

    const getBody = (repositories) => {

        const apiRateLimitExceeded = catchApiRateLimit(repositories)
        if(apiRateLimitExceeded) return apiRateLimitExceeded

        return(
            <div className={`main-page ${isPageLoading ? "loading" : ""}`}>
                <div className="main-page__repository-list">
                    <h1 className="main-page__repository-list__repositories-amount">
                        {repositories.total_count} repositories found
                    </h1>
                    {repositories.items ? repositories.items.map(repository => <Card props ={repository}/>) : ""}
                </div>
                {id && repositories.items ?
                    <Pagination
                        className={"main-page__pagination-container"}
                        defaultCurrent={page}
                        total={repositories.total_count > 1000 ? 1000 : repositories.total_count}
                        onChange={handlePageChange(id)}
                        locale={"en_US"}
                        showPrevNextJumpers={false}
                        nextIcon={<img src={"/src/svg/arrow.svg"} className={"main-page__pagination__next-button"}/>}
                        prevIcon={<img src={"/src/svg/arrow.svg"} className={"main-page__pagination__prev-button"}/>}
                    />
                    : null
                }
            </div>
        )
    }
    return (repositories
            ? getBody(repositories)
            : <div className={"loading-screen"}>
                <ReactLoading type={"spinningBubbles"} color={"#24292E"} height={100} width={100} />
            </div>
        )
}

MainPageContent.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number
}