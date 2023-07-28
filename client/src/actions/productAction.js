import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/productConstant';
import axios from 'axios';
import {HOST} from '../host';

export const getProducts = (keyword="", currentPage=1, price=[0,25000], category="", ratings=0)=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_REQUEST});
        let url = HOST+`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            url = HOST+`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(url,{
            'Access-Control-Allow-Origin':
        'https://mern-ecommerce-567.netlify.app',
        });
        dispatch({type: PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response ? err.response.data.error : err.message;
        dispatch({type: PRODUCT_FAIL, payload: error});
    }
}

export const getAdminProducts = ()=> async (dispatch)=>{
    try{
        dispatch({type: ADMIN_PRODUCT_REQUEST});
        let url = HOST+`/api/v1/admin/products`;
        const {data} = await axios.get(url, {
            'withCredentials': true,
        });
        dispatch({type: ADMIN_PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response ? err.response.data.error : err.message;
        dispatch({type: ADMIN_PRODUCT_FAIL, payload: error});
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

export const newReviewAction = (reviewData)=> async (dispatch)=>{
    try{
        dispatch({type: NEW_REVIEW_REQUEST});
        const {data} = await axios.put(HOST+`/api/v1/review`, reviewData, {
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        dispatch({type: NEW_REVIEW_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: NEW_REVIEW_FAIL, payload: error});
    }
}

export const createNewProduct = (productData)=> async (dispatch)=>{
    try{
        dispatch({type: NEW_PRODUCT_REQUEST});
        const {data} = await axios.post(HOST+`/api/v1/admin/product/new`, productData, {
            'headers': {
                'Content-Type': 'multipart/form-data',
            },
            'withCredentials': true,
        });
        dispatch({type: NEW_PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: NEW_PRODUCT_FAIL, payload: error});
    }
}

export const deleteProductAction = (id)=> async (dispatch)=>{
    try{
        dispatch({type: DELETE_PRODUCT_REQUEST});
        const {data} = await axios.delete(HOST+`/api/v1/admin/product/${id}`,{
            'withCredentials': true,
        });
        dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: DELETE_PRODUCT_FAIL, payload: error});
    }
}

export const updateProductAction = (id, productData)=> async (dispatch)=>{
    try{
        dispatch({type: UPDATE_PRODUCT_REQUEST});
        const {data} = await axios.put(HOST+`/api/v1//admin/product/${id}`, productData, {
            'headers': {
                'Content-Type': 'multipart/form-data',
            },
            'withCredentials': true,
        });
        dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: UPDATE_PRODUCT_FAIL, payload: error});
    }
}

export const allReviewAction = (productId)=> async (dispatch)=>{
    try{
        dispatch({type: ALL_REVIEW_REQUEST});
        let url = HOST+`/api/v1/reviews?productId=${productId}`;
        const {data} = await axios.get(url, {
            'withCredentials': true,
        });
        dispatch({type: ALL_REVIEW_SUCCESS, payload: data});
    }catch(err){
        const error = err.response ? err.response.data.error : err.message;
        dispatch({type: ALL_REVIEW_FAIL, payload: error});
    }
}

export const deleteReviewAction = (productId, reviewId)=> async (dispatch)=>{
    try{
        dispatch({type: DELETE_REVIEW_REQUEST});
        const {data} = await axios.delete(HOST+`/api/v1/review?productId=${productId}&reviewId=${reviewId}`,{
            'withCredentials': true,
        });
        dispatch({type: DELETE_REVIEW_SUCCESS, payload: data});
    }catch(err){
        const error = err.response.data.error ? err.response.data.error : err.message;
        dispatch({type: DELETE_REVIEW_FAIL, payload: error});
    }
}

export const clearErrors = ()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}