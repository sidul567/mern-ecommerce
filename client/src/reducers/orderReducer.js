import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CLEAR_ERRORS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../constants/orderConstant";

export const newOrderReducer = (state={cartItems: []}, action)=>{
    switch(action.type){
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case NEW_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderInfo: action.payload,
            }
        case NEW_ORDER_FAIL:
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

export const myOrderReducer = (state={orders: []}, action)=>{
    switch(action.type){
        case MY_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: action.payload,
            }
        case MY_ORDER_FAIL:
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

export const allOrderReducer = (state={orders: []}, action)=>{
    switch(action.type){
        case ALL_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: action.payload,
            }
        case ALL_ORDER_FAIL:
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

export const orderReducer = (state={}, action)=>{
    switch(action.type){
        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case DELETE_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
            }
        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case DELETE_ORDER_RESET:
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                success: false,
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

export const orderDetailsReducer = (state={order: {}}, action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
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

