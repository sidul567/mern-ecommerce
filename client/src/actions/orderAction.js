import axios from "axios";
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CLEAR_ERRORS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstant";
import { HOST } from "../host";

export const newOrderAction = (orderInfo) => async (dispatch)=>{
    try{
        dispatch({type: NEW_ORDER_REQUEST});
        const {data} = await axios.post(HOST+'/api/v1/order/new',orderInfo,{
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: NEW_ORDER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: NEW_ORDER_FAIL, payload: error});
    }
}

export const myOrderAction = () => async (dispatch)=>{
    try{
        dispatch({type: MY_ORDER_REQUEST});
        const {data} = await axios.get(HOST+'/api/v1/orders/me',{
            'withCredentials': true,
        });
        dispatch({type: MY_ORDER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: MY_ORDER_FAIL, payload: error});
    }
}

export const orderDetailsAction = (id) => async (dispatch)=>{
    try{
        dispatch({type: ORDER_DETAILS_REQUEST});
        const {data} = await axios.get(HOST+`/api/v1/order/${id}`,{
            'withCredentials': true,
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload: error});
    }
}

export const allOrderAction = () => async (dispatch)=>{
    try{
        dispatch({type: ALL_ORDER_REQUEST});
        const {data} = await axios.get(HOST+'/api/v1/admin/orders',{
            'withCredentials': true,
        });
        dispatch({type: ALL_ORDER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: ALL_ORDER_FAIL, payload: error});
    }
}

export const deleteOrderAction = (id)=> async (dispatch)=>{
    try{
        dispatch({type: DELETE_ORDER_REQUEST});
        const {data} = await axios.delete(HOST+`/api/v1/admin/order/${id}`,{
            'withCredentials': true,
        });
        dispatch({type: DELETE_ORDER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: DELETE_ORDER_FAIL, payload: error});
    }
}

export const updateOrderAction = (id, orderData)=> async (dispatch)=>{
    try{
        dispatch({type: UPDATE_ORDER_REQUEST});
        const {data} = await axios.put(HOST+`/api/v1//admin/order/${id}`, orderData, {
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
            'Access-Control-Allow-Origin': 'https://mern-ecommerce-567.netlify.app',
        });
        dispatch({type: UPDATE_ORDER_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: UPDATE_ORDER_FAIL, payload: error});
    }
}

export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}