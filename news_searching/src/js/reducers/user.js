import {Record} from "immutable";
import {FAILURE, GET_PROFILE_INFO, LOG_OUT, LOGIN_REQUEST, SENT, SUCCESS} from "../constants";

const UserState = Record({
    loading: false,
    authorized: localStorage.getItem("authorized"),
    userData: {
        userId: localStorage.getItem("userId"),
        loading: false,
        loaded: false,
        error: false
    },
    error: null,
});

const defaultState = UserState();

export default (userState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_REQUEST + SENT: {
            return userState.set("loading", true)
                .set("error", null)
        }
        case LOGIN_REQUEST + SUCCESS: {
            return userState.set("authorized", true)
                .set("loading", false)
                .setIn(["userData", "userId"], payload.id)
        }
        case LOGIN_REQUEST + FAILURE: {
            return userState.set("loading", false)
                .set("error", payload)
        }
        case GET_PROFILE_INFO + SENT: {
            return userState.setIn(["userData", "loading"], true)
        }
        case GET_PROFILE_INFO + SUCCESS: {
            return userState.mergeIn(["userData"], payload)
                .setIn(["userData", "loading"], false)
                .setIn(["userData", "loaded"], true)
        }
        case GET_PROFILE_INFO + FAILURE: {
            return userState.set("loading", false)
                .setIn(["userData", "error"], payload)
        }
        case LOG_OUT: {
            return userState.set("authorized", false)
                .set("userData", {
                    userId: null,
                    loading: false,
                    loaded: false,
                    error: false
            })
        }
    }
    
    return userState
}