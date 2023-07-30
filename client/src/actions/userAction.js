import axios from "axios";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstant";
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
                'Content-Type': 'multipart/form-data'
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
        const {data} = await axios.post(HOST+'/api/v1/logout',{
            'withCredentials': true,
        });
        dispatch({type: LOGOUT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: LOGOUT_FAIL, payload: error});
    }
}

export const updateProfileAction = (userInfo) => async (dispatch)=>{
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const {data} = await axios.put(HOST+'/api/v1/me/update', userInfo,{
            'headers': {
                'Content-Type': 'multipart/form-data',
            },
            'withCredentials': true,
        });
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error});
    }
}

export const changePasswordAction = (passwordInfo) => async (dispatch)=>{
    try{
        dispatch({type: CHANGE_PASSWORD_REQUEST});
        const {data} = await axios.put(HOST+'/api/v1/password/update', passwordInfo,{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: CHANGE_PASSWORD_FAIL, payload: error});
    }
}

export const forgetPasswordAction = (email) => async (dispatch)=>{
    try{
        dispatch({type: FORGET_PASSWORD_REQUEST});
        const {data} = await axios.post(HOST+'/api/v1/password/forget', email,{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: FORGET_PASSWORD_FAIL, payload: error});
    }
}

export const resetPasswordAction = (token, passwords) => async (dispatch)=>{
    try{
        dispatch({type: RESET_PASSWORD_REQUEST});
        const {data} = await axios.put(HOST+`/api/v1/password/reset/${token}`, passwords,{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: RESET_PASSWORD_FAIL, payload: error});
    }
}

export const allUserAction = () => async (dispatch)=>{
    try{
        dispatch({type: ALL_USER_REQUEST});
        const {data} = await axios.get(HOST+'/api/v1/admin/users',{
            'withCredentials': true,
        });
        dispatch({type: ALL_USER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: ALL_USER_FAIL, payload: error});
    }
}

export const userDetailsAction = (id) => async (dispatch)=>{
    try{
        dispatch({type: USER_DETAILS_REQUEST});
        const {data} = await axios.get(HOST+`/api/v1/admin/user/${id}`,{
            'withCredentials': true,
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: USER_DETAILS_FAIL, payload: error});
    }
}

export const updateUserAction = (id, userInfo) => async (dispatch)=>{
    try{
        dispatch({type: UPDATE_USER_REQUEST});
        const {data} = await axios.put(HOST+`/api/v1/admin/user/${id}`, userInfo,{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: UPDATE_USER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: UPDATE_USER_FAIL, payload: error});
    }
}

export const deleteUserAction = (id) => async (dispatch)=>{
    try{
        dispatch({type: DELETE_USER_REQUEST});
        const {data} = await axios.delete(HOST+`/api/v1/admin/user/${id}`,{
            'withCredentials': true,
        });
        dispatch({type: DELETE_USER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: DELETE_USER_FAIL, payload: error});
    }
} 

export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}