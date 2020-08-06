import {FAILURE, GET_NEWS_REQUEST, REQUESTED_NEW_SEARCH_QUERY, SENT, SUCCESS} from "../constants";

const defaultState = {
    totalEntities: null,
    pageNumber: 1,
    entities: {
        pages: {},
        loading: false,
        loaded: false,
    },
    error: null
};

export default (newsState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case REQUESTED_NEW_SEARCH_QUERY: {
            return(defaultState)
        }
        case GET_NEWS_REQUEST + SENT: {
            return {
                ...newsState,
                pageNumber: payload,
                entities: {
                    ...newsState.entities,
                    loading: true,
                    loaded: false,
                }
            }
        }
        case GET_NEWS_REQUEST + SUCCESS: {
            return {...newsState,
                totalEntities: payload.totalResults,
                entities: {
                    ...newsState.entities,
                    loaded: true,
                    loading: false,
                    pages: {
                        ...newsState.entities.pages,
                        [newsState.pageNumber]: payload.articles
                    }
                }
            }
        }
        case GET_NEWS_REQUEST + FAILURE: {
            return {...newsState,
                error: payload,
            }
        }
    }

    return newsState
}