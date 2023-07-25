import React, { useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { Lock, LockOpenOutlined } from '@mui/icons-material';
import './ChangePassword.css'
import { resetPasswordAction, clearErrors, loadUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ResetPassword.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { error, message, isLoading } = useSelector(state => state.forgetPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success("Password Changed Successfully!");
            dispatch(loadUser());
            navigate("/account");
        }
    }, [navigate, dispatch, error, message]);

    const resetPassword = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("newPassword", newPassword);
        formData.append("confirmPassword", confirmPassword);

        dispatch(resetPasswordAction(token, formData));
    }
    return (
        <>
            <div className="resetPasswordContainer">
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <div className="resetPassword">
                            <h1>Change Password</h1>
                            <form className="resetPasswordForm" onSubmit={resetPassword}>
                                <div className="newPassword">
                                    <LockOpenOutlined />
                                    <input
                                        type='password'
                                        required
                                        placeholder='New Password'
                                        name='newPassword'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="confirmPassword">
                                    <Lock />
                                    <input
                                        type='password'
                                        required
                                        placeholder='Confirm Password'
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update Profile"
                                    className='resetPasswordSubmit'
                                />
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ResetPassword