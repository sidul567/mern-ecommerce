import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './NewProduct.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { clearErrors, updateUserAction, userDetailsAction } from '../../actions/userAction';
import { UPDATE_USER_RESET, USER_DETAILS_RESET } from '../../constants/userConstant';

function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {user: currentUser, isLoading: currentUserLoading} = useSelector(state=>state.user);
    const {user} = useSelector(state=>state.userDetails);
    const {isLoading, error, success} = useSelector(state=>state.profileDetails);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(()=>{
        if(currentUser && currentUser._id!==id){
            dispatch(userDetailsAction(id));
        }else{
            setName(currentUser.name);
            setEmail(currentUser.email);
            setRole(currentUser.role);
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors);
        }
        if(success){
            toast.success("User updated successfully!");
            navigate("/admin/users");
            dispatch({type: UPDATE_USER_RESET});
            dispatch({type: USER_DETAILS_RESET});
        }
    }, [dispatch, error, success, navigate, currentUser, id])

    if(user.role !== "admin"){
        return <Navigate to="/login" />
    }

    const updateUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("role", role);

        dispatch(updateUserAction(id, formData));
    }  
  return (
    <>
    {
        isLoading && <Loader />
    }
    {
        currentUserLoading && <Loader />
    }
    <div className='dashboard'>
        <Sidebar open={true} />
        <div className="newProductContainer">
            <form className="newProductForm" onSubmit={updateUser}>
                <h1>Update User</h1>
                <div>
                    <Person />
                    <input
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                        name='name'
                    />
                </div>
                <div>
                    <MailOutline />
                    <input
                        type="email"
                        required
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                    />
                </div>
                <div>
                    <VerifiedUser />
                    <select value={role} onChange={(e)=>setRole(e.target.value)} required>
                        <option value="" disabled>Choose Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value="Update"
                    className='newProductSubmit'
                    disabled={isLoading}
                />
            </form>
        </div>
    </div>
    </>
  )
}

export default UpdateUser