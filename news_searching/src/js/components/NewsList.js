import React from 'react';
import {NewsCard} from "./NewsCard";
import PropTypes from "prop-types"

export const NewsList = ({newsObj}) => {

    return(
        <div className="news-list">
            {Object.keys(newsObj).map(page => {
                return newsObj[page].map(news => {
                    return (
                        <NewsCard
                            key={news.publishedAt}
                            newsDate={news.publishedAt}
                            newsDescription={news.description}
                            srcLink={news.url}
                            title={news.title}
                            srcImg={news.urlToImage ? news.urlToImage : false}
                        />
                        )
                })
            })}
        </div>
    )
}

NewsList.propTypes = {
    newsObj: PropTypes.shape = ({
        optionalObject: PropTypes.shape = {
            loading: PropTypes.bool.isRequired,
            loaded: PropTypes.bool.isRequired,
            news: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                publishedAt: PropTypes.string.isRequired,
                urlToImage: PropTypes.string
            }))
        }
    })
}