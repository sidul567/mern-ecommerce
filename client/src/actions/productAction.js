import { CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from '../constants/productConstant';
import axios from 'axios';
import {HOST} from '../host';

export const getProducts = (keyword="", currentPage=1, price=[0,25000], category="", ratings=0)=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_REQUEST});
        let url = HOST+`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            url = HOST+`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(url);
        dispatch({type: PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response ? err.response.data.error : err.message;
        dispatch({type: PRODUCT_FAIL, payload: error});
    }
}

export const getProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(HOST+`/api/v1/product/${id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error});
    }
}

export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}