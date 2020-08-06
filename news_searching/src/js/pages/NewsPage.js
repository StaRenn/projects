import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from "react-loading"
import {NewsList} from "../components/NewsList";
import {getNews} from "../AC";
import news from "../reducers/news";

export const NewsPage = ({searchQuery}) => {

    const dispatch = useDispatch();
    const {pageNumber} = useSelector(state => state.news)
    const totalCount = useSelector(state => state.news.totalEntities);
    const newsObj = useSelector(state => state.news.entities);
    const error = useSelector(state => state.news.error);

    useEffect(() => {
        dispatch(getNews(searchQuery, pageNumber))
    }, [])

    const loadMoreNews = () => {
        if(newsObj.loading) return
        dispatch(getNews(searchQuery, pageNumber + 1))
    }

    return (
        <div className={"news-page"}>
            {totalCount === 0
                ? <h1 className={"no-results"}>No results found.</h1>
                : error
                    ? <p className={"message-box"}>{error}</p>
                    :newsObj.pages["1"] &&
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMoreNews}
                            hasMore={Math.ceil(totalCount / 10) > pageNumber}
                            loader={<ReactLoading type={"spinningBubbles"} color={"black"} height={`100px`} width={`100px`}/>}
                            style={{
                            height: "100%",
                            overflow: "visible",
                            }}
                        >
                            <NewsList newsObj={newsObj.pages}/>
                        </InfiniteScroll>
            }
        </div>
    );
}

