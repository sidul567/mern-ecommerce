import { CheckCircleOutline } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './OrderSuccess.css';

function OrderSuccess() {
  return (
    <>
        <div className="successContainer">
        <CheckCircleOutline />
        <Typography>Your order has been placed successfully!</Typography>
        <Link to="/orders">View Orders</Link>
        </div>
    </>
  )
}

export default OrderSuccess