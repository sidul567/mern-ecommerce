import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {allReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, reviewReducer} from './reducers/productReducer';
import { allUserReducer, forgetPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    userDetails: userReducer,
    profileDetails: profileReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrder: allOrderReducer,
    order: orderReducer,
    allUser: allUserReducer,
    user: userDetailsReducer,
    productReviews: allReviewReducer,
    review: reviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : [],
    },
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;