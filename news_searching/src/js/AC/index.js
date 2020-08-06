import {
    LOGIN_REQUEST,
    SENT,
    FAILURE,
    SUCCESS,
    API_LOGIN_ROOT,
    GET_PROFILE_INFO,
    API_PROFILE_INFO,
    LOG_OUT,
    GET_NEWS_REQUEST,
    API_NEWS_SEARCH_ROOT,
    REQUESTED_NEW_SEARCH_QUERY,
    API_NEWS_SEARCH_KEY,
    CORS_ANYWHERE,
    API_NEWS_SEARCH
} from "../constants";
import {validatePassword, validateEmail} from "../helpers";

export const logOut = () => {
    return({
        type: LOG_OUT
    })
}

export const resetStateForNewSearchQuery = () => {
    return({
        type: REQUESTED_NEW_SEARCH_QUERY
    })
}

export const logIn = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST + SENT,
        });
        if(validatePassword(password) && validateEmail(email)) {
            fetch(API_LOGIN_ROOT, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({email: email, password: password})
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === "ok") {
                        dispatch({
                            type: LOGIN_REQUEST + SUCCESS,
                            payload: response.data
                        })
                    } else dispatch({
                        type: LOGIN_REQUEST + FAILURE,
                        payload: response.message
                    })
                })
                .catch(error => dispatch({
                    type: LOGIN_REQUEST + FAILURE,
                    payload: error
                }))
        }else{
            dispatch({
                type: LOGIN_REQUEST + FAILURE,
                payload: "email must be valid and password length must be more than 4 symbols"
            })
        }
    }
}

export const getProfileInfo = (userId) => {
    return (dispatch) => {
        dispatch({
            type: GET_PROFILE_INFO + SENT,
        })
        fetch(API_PROFILE_INFO + userId)
            .then(response => response.json())
            .then(response => {
                if(response.status === "ok"){
                    console.log(response)
                    dispatch({
                        type: GET_PROFILE_INFO + SUCCESS,
                        payload: response.data
                    })
                }else{
                    dispatch({
                        type: GET_PROFILE_INFO + FAILURE,
                        payload: response.message
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: GET_PROFILE_INFO + FAILURE,
                    payload: error
                })
            })
    }
}

export const getNews = (searchQuery, page) => {

    return (dispatch) => {
        dispatch({
            type: GET_NEWS_REQUEST + SENT,
            payload: page
        })
        fetch( API_NEWS_SEARCH + `?q=${searchQuery}&pageSize=10&sortBy=publishedAt&page=${page}&apiKey=${API_NEWS_SEARCH_KEY}`)
            .then(response => response.json())
            .then(response => {
                if (response.status === "ok"){
                    dispatch({
                        type: GET_NEWS_REQUEST + SUCCESS,
                        payload: response
                    })
                }
                else{
                    dispatch({
                        type: GET_NEWS_REQUEST + FAILURE,
                        payload: response.message
                    })
                }
            })
            .catch(error => dispatch({
                type: GET_NEWS_REQUEST + FAILURE,
                payload: response.message
            }))
    }
}