import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { myOrderAction } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';

function MyOrders() {
  const { isLoading, error } = useSelector(state => state.myOrders);
  const { orders } = useSelector(state => state.myOrders.orders);
  const {user} = useSelector(state=>state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(myOrderAction());
  }, [error, dispatch]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5, cellClassName: (params) => {
        return params.row.status === "Processing" ? "redColor" : "greenColor";
      }
    },
    { field: "itemQty", headerName: "Item Qty.", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "action", headerName: "Action", type: "number", sortable: false, minWidth: 150, flex: 0.3, renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchOutlined />
          </Link>
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
    <div className="myOrderContainer">
        {
          isLoading ? (
            <Loader />
          ) : (
            <>
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
                className='myOrderTable'
                autoHeight
                pageSizeOptions={[10]}
              />
              <Typography>{user.name}'s Orders</Typography>
            </>
          )
        }
    </div>
  )
}

export default MyOrders