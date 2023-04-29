import { CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../constants/productConstant"

export const productReducer = (state={products: []}, action)=>{
    switch(action.type){
        case PRODUCT_REQUEST:
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
        case PRODUCT_FAIL:
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}