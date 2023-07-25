import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import { clearErrors, forgetPasswordAction } from '../../actions/userAction';
import { MailOutline } from '@mui/icons-material';
import './ForgetPassword.css';

function ForgetPassword() {
    const { error, message, isLoading } = useSelector(state => state.forgetPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message.message);
        }
    }, [navigate, dispatch, error, message]);

    const forgetPassword = (e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("email", email);

        dispatch(forgetPasswordAction(formData));
    }

    return (
        <>
            <div className="forgetPasswordContainer">
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <div className="forgetPassword">
                            <h1>Change Password</h1>
                            <form className="forgetPasswordForm" onSubmit={forgetPassword}>
                                <div className="forgetPasswordEmail">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        required
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Send Link"
                                    className='forgetPasswordSubmit'
                                />
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ForgetPassword