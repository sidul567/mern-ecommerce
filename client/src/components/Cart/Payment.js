import { CreditCardOutlined, EventOutlined } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HOST } from '../../host';
import { useNavigate } from 'react-router-dom';
import { newOrderAction } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import CheckoutStep from './CheckoutStep';

function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.userDetails);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const paymentBtn = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const paymentInfo = {
        amount: Math.round(orderInfo.total * 100),
    }

    const payment = async (e) => {
        e.preventDefault();

        paymentBtn.current.disabled = true;
        setLoading(true);

        try {
            const { data } = await axios.post(HOST + "/api/v1/payment/process", paymentInfo, {
                'headers': {
                    'Content-Type': 'application/json',
                },
                'withCredentials': true,
            });

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const order = {
                shippingInfo,
                orderItems: cartItems,
                itemPrice: orderInfo.subtotal,
                vat: orderInfo.vat,
                shippingPrice: orderInfo.shippingCharge,
                totalPrice: orderInfo.total,
            }   

            const result = await stripe.confirmCardPayment(client_secret, {
                'payment_method': {
                    'card': elements.getElement(CardNumberElement),
                    'billing_details': {
                        'name': user.name,
                        'email': user.email,
                        'address': {
                            'line1': shippingInfo.address,
                            'city': shippingInfo.city,
                            'country': shippingInfo.country,
                            'postal_code': shippingInfo.pincode,
                            'state': shippingInfo.state,
                        }
                    }
                }
            })

            if (result.error) {
                paymentBtn.current.disabled = false;
                toast.error(result.error.message);
                setLoading(false);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(newOrderAction(order));
                    navigate("/success");
                } else {
                    toast.error("There are some problems while processing payment.");
                }
                setLoading(false);
            }

        } catch (err) {
            paymentBtn.current.disabled = false;
            toast.error(err.message);
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <Loader />}
            <CheckoutStep activeStep={2} />
            <div className="paymentContainer">
                <div className="payment">
                    <h1>Card Info</h1>
                    <form className="paymentForm" onSubmit={payment} encType='multipart/form-data'>
                        <div>
                            <CreditCardOutlined />
                            <CardNumberElement className='cardNumber' />
                        </div>
                        <div>
                            <EventOutlined />
                            <CardExpiryElement className='cardExpiryElement' />
                        </div>
                        <div>
                            <EventOutlined />
                            <CardCvcElement className='cardCvcElement' />
                        </div>
                        <input
                            type="submit"
                            value={`Pay - $${orderInfo && orderInfo.total}`}
                            className='paymentSubmit'
                            ref={paymentBtn}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment