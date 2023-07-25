import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, CLEAR_ERRORS, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant"


export const cartReducer = (state={cartItems: []}, action)=>{
    switch(action.type){
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ADD_TO_CART_SUCCESS:
            const item = action.payload;
            const isExistItem = state.cartItems.find((cartItem)=>cartItem.productId === item.productId);

            if(isExistItem){
                return{
                    ...state,
                    isLoading: false,
                    cartItems: state.cartItems.map((cartItem)=>cartItem.productId===item.productId ? item : cartItem),
                }
            }else{
                return {
                    ...state,
                    isLoading: false,
                    cartItems: [...state.cartItems, item],
                }
            }
        case ADD_TO_CART_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem)=>cartItem.productId !== action.payload),
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
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