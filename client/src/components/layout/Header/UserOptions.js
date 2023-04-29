import { Dashboard, ExitToApp, ListAltOutlined, Person } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, makeStyles } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAction } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';
import makeStyles from '@mui/styles'
import './Header.css'

function UserOptions({user}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useStyles = makeStyles({
    tooltip: {
      fontSize: 30
    }
  })

  const classes = useStyles();

  const dashboard = ()=>{
    navigate("/dashboard");
  }

  const orders = ()=>{
    navigate("/orders");
  }

  const account = ()=>{ 
    navigate("/account");
  }

  const logout = ()=>{
    dispatch(logoutAction())
    toast.success("Logout Successful!");
  }

  const options = [
    {icon: <ListAltOutlined />, title: "Orders", func: orders},
    {icon: <Person />, title: "Profile", func: account},
    {icon: <ExitToApp />, title: "Log Out", func: logout},
  ]

  if(user.role === "admin"){
    options.unshift({icon: <Dashboard />, title: "Dashboard", func: dashboard})
  }

  return (
    <>
        <SpeedDial 
            ariaLabel='SpeedDial tooltip example'
            open={open}
            onOpen={()=>setOpen(true)}
            onClose={()=>setOpen(false)}
            direction='down'
            icon={<img src={user.avatar ? user.avatar.url : '/profile.jpg'} className='speedDialIcon' alt='User Profile' width={50} height={50} />}
            className='speedDial'
        >
        {options.map((option)=>(
            <SpeedDialAction 
                icon={option.icon}
                tooltipTitle={option.title}
                onClick={option.func}
                TooltipClasses={classes}
            />
        ))}
        </SpeedDial>
    </>
  )
}

export default UserOptions