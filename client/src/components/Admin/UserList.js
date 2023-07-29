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
import { allUserAction, deleteUserAction } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstant';

function UserList() {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.userDetails);
  const {error} = useSelector(state=>state.allUser);
  const {users} = useSelector(state=>state.allUser.users);
  const {error: deleteError, success, isLoading} = useSelector(state=>state.profileDetails);
  const dispatch = useDispatch();

  useEffect(()=>{ 
    if(error){
      toast.error(error);
    }
    if(deleteError){
      toast.error(deleteError);
    }
    if(success){
      toast.success("User deleted successfully!");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_USER_RESET});
    }
    dispatch(allUserAction());
  }, [dispatch, error, deleteError, navigate, success])

  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  const deleteUser = (id)=>{
    dispatch(deleteUserAction(id));
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 1 },
    {
      field: "name", headerName: "Name", minWidth: 150, flex: 0.5, 
    },
    { field: "email", headerName: "Email", minWidth: 250, flex: 0.5 },
    { field: "role", headerName: "Role",minWidth: 90, flex: 0.3 , cellClassName: (params) => {
      return params.row.role === "user" ? "redColor" : "greenColor";
    }},
    {
      field: "actions", headerName: "Actions", type: "number", sortable: false, minWidth: 150, flex: 0.3, renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={()=>deleteUser(params.row.id)} disabled={isLoading}>
              <Delete />
            </Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  users && users.forEach((user)=>{
    rows.push({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  })

  return (
    <div className='dashboard'>
      {isLoading && <Loader />}
      <Sidebar active="user"/>
      <div className="productsListContainer">
       <h1>All Users</h1>
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

export default UserList