import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constants/userConstant";
import { HOST } from "../host";

export const loginAction = (email, password) => async (dispatch)=>{
    try{
        dispatch({type: LOGIN_REQUEST});
        const {data} = await axios.post(HOST+'/api/v1/login',{email, password},{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: LOGIN_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: LOGIN_FAIL, payload: error});
    }
}

export const signUpAction = (userInfo) => async (dispatch)=>{
    try{
        dispatch({type: SIGNUP_REQUEST});
        const {data} = await axios.post(HOST+'/api/v1/register',userInfo,{
            'headers': {
                'Content': 'multipart/form-data',
            },
            'withCredentials': true,
        });
        dispatch({type: SIGNUP_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: SIGNUP_FAIL, payload: error});
    }
}

export const loadUser = () => async (dispatch)=>{
    try{
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get(HOST+'/api/v1/me',{
            'withCredentials': true,
        });
        dispatch({type: LOAD_USER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: LOAD_USER_FAIL, payload: error});
    }
}

export const logoutAction = () => async (dispatch)=>{
    try{
        dispatch({type: LOGOUT_REQUEST});
        const {data} = await axios.get(HOST+'/api/v1/logout',{
            'withCredentials': true,
        });
        dispatch({type: LOGOUT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: LOGOUT_FAIL, payload: error});
    }
}

export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}