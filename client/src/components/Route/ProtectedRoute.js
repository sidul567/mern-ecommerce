import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const {isLoading, isAuthenticate} = useSelector(state=>state.userDetails);
  return (
    <>
    {
        isLoading  === false && (
            <>
                {
                    isAuthenticate === true ? <Outlet /> : <Navigate to="/login" />
                }
            </>
        )
    }
    </>
  )
}

export default ProtectedRoute