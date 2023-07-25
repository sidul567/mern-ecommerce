import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './ProductList.css';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import { allOrderAction, deleteOrderAction } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

function OrderList() {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.userDetails);
  const {orders, error} = useSelector(state=>state.allOrder.orders);
  const {error: deleteError, success, isLoading} = useSelector(state=>state.order);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      toast.error(error);
    }
    if(deleteError){
      toast.error(deleteError);
    }
    if(success){
      toast.success("Order deleted successfully!");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_ORDER_RESET});
    }
    dispatch(allOrderAction());
  }, [dispatch, error, deleteError, navigate, success])

  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  const deleteOrder = (id)=>{
    dispatch(deleteOrderAction(id));
  }

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5, cellClassName: (params) => {
        return params.row.status === "Processing" ? "redColor" : "greenColor";
      }
    },
    { field: "itemQty", headerName: "Item Qty.", type: "number", minWidth: 100, flex: 0.1 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 200, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: "number", sortable: false, minWidth: 150, flex: 0.3, renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={()=>deleteOrder(params.row.id)} disabled={isLoading}>
              <Delete />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  orders && orders.forEach((order)=>{
    rows.push({
      id: order._id,
      status: order.orderStatus,
      itemQty: order.orderItems.length,
      amount: "$"+order.totalPrice,
    })
  })

  return (
    <div className='dashboard'>
      {isLoading && <Loader />}
      <Sidebar open={false} />
      <div className="productsListContainer">
       <h1>All Orders</h1>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                }
              }
            }}
            disableRowSelectionOnClick
            className='productListTable'
            autoHeight
            pageSizeOptions={[10]}
          />
      </div>
    </div>
  )
}

export default OrderList