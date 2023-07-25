import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'

function CartItemCard({item, removeCartItem}) {
  return (
    <div className='cartItemCard'>
        <img src={item.image} alt="" />
        <div>
            <Link to="/">{item.name}</Link>
            <span>${item.price}</span>
            <p onClick={()=>removeCartItem(item.productId)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard