import axios from "axios";
import { HOST } from "../host";
import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const addToCartAction = (id, quantity) => async (dispatch, getState)=>{
    try{
        dispatch({type: ADD_TO_CART_REQUEST});
        const {data} = await axios.get(HOST+`/api/v1/product/${id}`);
        dispatch({type: ADD_TO_CART_SUCCESS, payload: {
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            image: data.product.images[0].url,
            quantity
        }});

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }catch(err){
        const error = err.response?.data ? err.response.data.error : err.message;
        dispatch({type: ADD_TO_CART_FAIL, payload: error}); 
    }
}

export const removeCartItemAction = (id) => async (dispatch, getState)=>{
    dispatch({type: REMOVE_CART_ITEM, payload: id});

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const shippingInfoAction = (data) => async (dispatch, getState)=>{
    dispatch({type: SAVE_SHIPPING_INFO, payload: data});
    localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo));
}