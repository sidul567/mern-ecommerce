import { Dashboard, ExitToApp, ListAltOutlined, Person, ShoppingCart } from '@mui/icons-material';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAction } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css'

function UserOptions({user}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart);

  const dashboard = ()=>{
    navigate("/admin/dashboard");
  }

  const orders = ()=>{
    navigate("/orders");
  }

  const account = ()=>{ 
    navigate("/account");
  }

  const cart = ()=>{ 
    navigate("/cart");
  }

  const logout = ()=>{
    dispatch(logoutAction())
    toast.success("Logout Successful!");
  }

  const options = [
    {icon: <ListAltOutlined />, title: "Orders", func: orders},
    {icon: <Person />, title: "Profile", func: account},
    {icon: <ShoppingCart style={{color: cartItems.length !== 0 ? "tomato" : "unset"}} />, title: `Cart(${cartItems.length})`, func: cart},
    {icon: <ExitToApp />, title: "Log Out", func: logout},
  ]

  if(user.role === "admin"){
    options.unshift({icon: <Dashboard />, title: "Dashboard", func: dashboard})
  }

  return (
    <>
        <Backdrop open={open} style={{zIndex: 9}} />
        <SpeedDial 
            ariaLabel='SpeedDial tooltip example'
            open={open}
            onOpen={()=>setOpen(true)}
            onClose={()=>setOpen(false)}
            direction='down'
            icon={<img src={user.avatar ? user.avatar.url : '/profile.jpg'} className='speedDialIcon' alt='User Profile' />}
            className='speedDial'
        >
        {options.map((option, i)=>(
            <SpeedDialAction 
                key={i}
                icon={option.icon}
                tooltipTitle={option.title}
                onClick={option.func}
                tooltipOpen={window.innerWidth < 600 ? true : false}
            />
        ))}
        </SpeedDial>
    </>
  )
}

export default UserOptions