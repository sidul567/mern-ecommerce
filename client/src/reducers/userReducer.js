import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constants/userConstant"

export const userReducer = (state={user: {}}, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGOUT_REQUEST: 
            return {
                ...state,
                isLoading: true,
                isAuthenticate: false,
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                isAuthenticate: true,
                user: action.payload.user,
            }
        case LOGOUT_SUCCESS:
            return {
                isLoading: false,
                isAuthenticate: false,
                user: null,
                error: null,
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOAD_USER_FAIL:
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticate: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error: null,
                isAuthenticate: false,
            }
        default:
            return state;
    }
}