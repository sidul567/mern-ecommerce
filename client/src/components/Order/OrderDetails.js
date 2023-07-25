import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors, orderDetailsAction } from '../../actions/orderAction';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import './OrderDetails.css'

function OrderDetails() {
    const { isLoading, error } = useSelector(state => state.orderDetails);
    const { order } = useSelector(state => state.orderDetails.order);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (error) { 
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(orderDetailsAction(id));
    }, [error, dispatch, id]);
    return (
        <div className="orderDetailsContainer">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="orderTitle">
                            <h2>Order #{order?._id}</h2>
                        </div>
                        <div className="shippingInfo">
                            <h3>Shipping Info</h3>
                            <div className='info'>
                                <p>Name: <span>{order?.user.name}</span></p>
                                <p>Phone: <span>{order?.shippingInfo.phone}</span></p>
                                <p>Address: <span>{order?.shippingInfo.address},{order?.shippingInfo.city},{order?.shippingInfo.state},{order?.shippingInfo.pincode},{order?.shippingInfo.country}</span></p>
                            </div>
                        </div>
                        <div className="paymentInfo">
                            <h3>Payment Info</h3>
                            <div className='info'>
                                <p className={order?.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}><strong>{order?.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}</strong></p>
                                <p>Amount: <span>${order?.totalPrice}</span></p>
                            </div>
                        </div>
                        <div className="orderStatusInfo">
                            <h3>Order Status</h3>
                            <div className='info'>
                                <p className={order?.orderStatus === "Processing" ? "redColor" : "greenColor"}><strong>{order?.orderStatus}</strong></p>
                            </div>
                        </div>
                        <div className="orderItemsContainer">
                            <h3>Order Items</h3>
                            {
                                order && order.orderItems && order.orderItems.map((item) => (
                                    <div className="orderItem" key={item.productId}>
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p><span>{item.quantity} X ${item.price}</span> = <b>${item.quantity * item.price}</b></p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default OrderDetails