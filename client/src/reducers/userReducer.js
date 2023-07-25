import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS } from "../constants/userConstant"

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
            }
        default:
            return state;
    }
}

export const profileReducer = (state={}, action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case UPDATE_PROFILE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                isUpdated: action.payload,
                success: true,
            }
        case UPDATE_PROFILE_RESET:
        case CHANGE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
        case DELETE_USER_RESET:
            return {
                ...state,
                isLoading: false,
                isUpdated: false,
                success: false,
            }
        case UPDATE_PROFILE_FAIL:
        case CHANGE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                isUpdated: false,
                success: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error: null,
            }
        default:
            return state;
    }
}

export const forgetPasswordReducer = (state={}, action)=>{
    switch(action.type){
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case FORGET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                message: action.payload,
            }
        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error: null,
            }
        default:
            return state;
    }
}

export const allUserReducer = (state={users: []}, action)=>{
    switch(action.type){
        case ALL_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ALL_USER_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                users: action.payload,
            }
        case ALL_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error: null,
            }
        default:
            return state;
    }
}

export const userDetailsReducer = (state={user: {}}, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                user: action.payload.user,
            }
        case USER_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case USER_DETAILS_RESET:
            return {
                ...state,
                user: {},
                isLoading: false,
                error: null,
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error: null,
            }
        default:
            return state;
    }
}