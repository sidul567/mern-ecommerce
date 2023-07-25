import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './UpdateOrder.css';
import { toast } from 'react-toastify';
import { clearErrors, orderDetailsAction, updateOrderAction } from '../../actions/orderAction';
import Sidebar from './Sidebar';
import { AccountTree } from '@mui/icons-material';
import Loader from '../layout/Loader/Loader';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';

function UpdateOrder() {
  const {user} = useSelector(state=>state.userDetails);
  const { order } = useSelector(state => state.orderDetails.order);
  const { isLoading: orderLoading } = useSelector(state => state.orderDetails);
  const { error, success, isLoading } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [status, setStatus] = useState("");

  useEffect(()=>{
    if (error) { 
        toast.error(error);
        dispatch(clearErrors());
    }
    if(success){
        toast.success("Order Updated successfully!");
        dispatch({type: UPDATE_ORDER_RESET});
    }
    dispatch(orderDetailsAction(id));
  }, [error, dispatch, id, success]);

  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  const updateOrder = (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("status", status);
    dispatch(updateOrderAction(id, formData));
  }

  return (
    <>
        <div className="dashboard">
            <Sidebar />
            {
                orderLoading ? <Loader /> : (
                    <>
                        <div className="upateOrderContainer">
                            {
                                isLoading && <Loader />
                            }
                            <div className="side1">
                                <div className="shippingInfo">
                                    <h3>Shipping Info</h3>
                                    <div className="userInfo">
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
                                <div className="cartItemsContainer">
                                    <h3>Cart Items</h3>
                                    {
                                        order && order.orderItems && order.orderItems.map((item)=>(
                                            <div className="cartItem" key={item.productId}>
                                                <img src={item.image} alt="" />
                                                <p>{item.name}</p>
                                                <p><span>{item.quantity} X ${item.price}</span> = <b>${item.quantity * item.price}</b></p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {order && order.orderStatus !== "Delivered" && <div className="side2">
                                <h3>Process Order</h3>
                                    <form className="newProductForm" onSubmit={updateOrder}>
                                    <div>
                                        <AccountTree />
                                        <select defaultValue={""} onChange={(e)=>setStatus(e.target.value)} required>
                                            <option value="" disabled>Choose Status</option>
                                            {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                                            {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                                        </select>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className='newProductSubmit'
                                        disabled={isLoading}
                                    />
                                </form>
                            </div>}
                            </div>
                    </>
                )
            }
        </div>
    </>
  )
}

export default UpdateOrder