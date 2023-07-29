import React, { useEffect, useState } from 'react'
import './Cart.css';
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeCartItemAction } from '../../actions/cartAction';
import { RemoveShoppingCart } from '@mui/icons-material'
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const [grossProfit, setGrossProfit] = useState(0);
    const navigate = useNavigate();
    const increaseQuantity = (product) => {
        if (product.quantity + 1 > product.stock) return;
        dispatch(addToCartAction(product.productId, product.quantity+1));
    }

    const decreaseQuantity = (product) => {
        if (product.quantity - 1 < 1) return;
        dispatch(addToCartAction(product.productId, product.quantity-1));
    }
    
    const removeCartItem = (productId)=>{
        dispatch(removeCartItemAction(productId));
    }

    const checkOut = ()=>{
        navigate("/login?redirect=shipping");
    }

    useEffect(()=>{
       let total = 0;
       cartItems && cartItems.forEach((cartItem)=>{
            total += (cartItem.price*cartItem.quantity);
       })
       setGrossProfit(total);
    },[cartItems, grossProfit])

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCard">
                    <RemoveShoppingCart />
                    <Typography>No Item Found in Your Cart.</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <div className='cartPage'>
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {
                cartItems && cartItems.map((cartItem) => (
                    <div className="cartContainer" key={cartItem.productId}>
                        <CartItemCard item={cartItem} removeCartItem={removeCartItem} />
                        <div className="cartInput">
                            <button onClick={()=>decreaseQuantity(cartItem)}>-</button>
                            <input type="number" readOnly value={cartItem.quantity} />
                            <button onClick={()=>increaseQuantity(cartItem)}>+</button>
                        </div>
                        <p className='cartSubtotal'>${cartItem.price * cartItem.quantity}</p>
                    </div>
                ))
            }
            <div className="grossTotal">
                <div></div>
                <div className="grossProfitBox">
                    <p>Gross Total</p>
                    <p>${grossProfit}</p>
                </div>
                <div></div>
                <div className="checkOut">
                    <button onClick={checkOut}>Check Out</button>
                </div>
            </div>
        </div>
            )}
        </>
    )
}

export default Cart