import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';
import CheckoutStep from './CheckoutStep';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HOST } from '../../host';
import logo from '../../images/logo.png';
import { newOrderAction } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';

function ConfirmOrder() {
  const {user} = useSelector(state=>state.userDetails);
  const {shippingInfo, cartItems} = useSelector(state=>state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const subtotal = cartItems.reduce((acc,item)=>
    acc + item.quantity * item.price
  ,0)
  const shippingCharge = subtotal > 1000 ? 0 : 200;
  const vat = subtotal*0.15;
  const total = subtotal + shippingCharge + vat;

  const processPayment = async ()=>{
     const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: subtotal,
        vat: vat,
        shippingPrice: shippingCharge,
        totalPrice: total,
    }
    //  sessionStorage.setItem("orderInfo", JSON.stringify(paymentInfo));
    //  navigate("/payment/process");
    try{
        setLoading(true);
        const { data: {key} } = await axios.get(HOST + "/api/v1/razorKey", {
            'withCredentials': true,
        });

        const { data } = await axios.post(HOST + "/api/v1/payment/checkout", {total}, {
            'headers': {
                'Content-Type': 'application/json',
            },
            'withCredentials': true,
        });
        
        var options = {
            "key": key, 
            "amount": data.order.amount,
            "currency": "INR",
            "name": "Mern Ecommerce",
            "description": "Test Transaction",
            "image": logo,
            "order_id": data.order.id,
            "handler": async function (response){
                const razor_payment_id = response.razorpay_payment_id;
                const razorpay_order_id = response.razorpay_order_id;
                const razorpay_signature = response.razorpay_signature;

                const {data} = await axios.post(HOST + "/api/v1/payment/paymentVerification", {razor_payment_id, razorpay_order_id, razorpay_signature}, {
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'withCredentials': true,
                });
                setLoading(true);
                if(data.success){
                    order.paymentInfo = {
                        id: razor_payment_id,
                        status: "succeeded",
                    }
                    dispatch(newOrderAction(order));
                    navigate("/success");
                }else{
                    toast.error("There are some problems while processing payment.");
                }
                setLoading(false);
            },
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": "9000090000"
            },
            "notes": {
                "address": `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`
            },
            "theme": {
                "color": "#FF6347"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        setLoading(false);
    }catch(err){
        toast.error(err.message);
    }
  }
  return (
    <>
        {loading && <Loader />}
        <CheckoutStep activeStep={1} />
        <div className="confirmOrderContainer">
            <div className="side1">
                <div className="shippingInfo">
                    <h3>Shipping Info</h3>
                    <div className="userInfo">
                        <p>Name: <span>{user.name}</span></p>
                        <p>Phone: <span>{shippingInfo.phone}</span></p>
                        <p>Address: <span>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.pincode}, {shippingInfo.country}</span></p>
                    </div>
                </div>
                <div className="cartItemsContainer">
                    <h3>Cart Items</h3>
                    {
                        cartItems && cartItems.map((item)=>(
                            <div className="cartItem" key={item.productId}>
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                                <p><span>{item.quantity} X ${item.price}</span> = <b>${item.quantity * item.price}</b></p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="side2">
                <h3>Order Summary</h3>
                <p>Subtotal: ${subtotal}</p>
                <p>Shipping Charges: ${shippingCharge}</p>
                <p>VAT: ${vat}</p>
                <p><b>Total: ${total}</b></p>
                <button onClick={processPayment} disabled={loading}>Proceed To Payment</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder