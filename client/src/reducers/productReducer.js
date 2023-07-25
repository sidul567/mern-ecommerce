import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_RESET, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstant"

export const productsReducer = (state={products: []}, action)=>{
    switch(action.type){
        case PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filterProductCount: action.payload.filterProductCount,
            }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
            }
        case PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
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

export const productReducer = (state={}, action)=>{
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case DELETE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case DELETE_PRODUCT_RESET:
        case UPDATE_PRODUCT_RESET:
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

export const productDetailsReducer = (state={product: []}, action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload.product,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case PRODUCT_DETAILS_RESET:
            return {
                ...state,
                isLoading: false,
                product: [],
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

export const newReviewReducer = (state={}, action)=>{
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload.success,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                isLoading: false,
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

export const newProductReducer = (state={product: []}, action)=>{
    switch(action.type){
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
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

export const allReviewReducer = (state={reviews: []}, action)=>{
    switch(action.type){
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ALL_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reviews: action.payload.reviews,
            }
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                reviews: [],
                isLoading: false,
                error: action.payload,
            }
        case ALL_REVIEW_RESET:
            return {
                ...state,
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

export const reviewReducer = (state={}, action)=>{
    switch(action.type){
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case DELETE_REVIEW_RESET:
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