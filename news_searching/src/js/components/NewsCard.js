import React from 'react';
import PropTypes from "prop-types";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

export const NewsCard = ({title, srcImg, newsDescription, srcLink, newsDate}) => {

    return(
        <LazyLoadComponent>
            <div className="news-card">
                <a href={srcLink} className={"news-card__title"}>{title}</a>
                {srcImg && <LazyLoadImage
                    alt={title}
                    src={srcImg}
                    effect={"opacity"}
                    className={"news-card__img"}
                />}
                <p className={"news-card__description"}>{newsDescription}</p>
                <h3 className={"news-card__date"}>
                    {(new Date(newsDate)).toDateString()}
                </h3>
            </div>
        </LazyLoadComponent>
    )
}

NewsCard.propTypes = {
    title: PropTypes.string.isRequired,
    srcImg: PropTypes.string,
    newsDescription: PropTypes.string.isRequired,
    srcLink: PropTypes.string.isRequired,
    newsDate: PropTypes.string.isRequired,
}

