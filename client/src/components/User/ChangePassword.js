import React, { useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { Lock, LockOpenOutlined, VpnKey } from '@mui/icons-material';
import './ChangePassword.css'
import { changePasswordAction, clearErrors } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CHANGE_PASSWORD_RESET } from '../../constants/userConstant';

function ChangePassword() {

    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { isAuthenticate } = useSelector(state => state.userDetails);
    const { error, isUpdated, isLoading } = useSelector(state => state.profileDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticate) {
            navigate("/login");
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Password changed successfully!");
            navigate("/account");
            dispatch({
                type: CHANGE_PASSWORD_RESET,
            })
        }
    }, [isAuthenticate, navigate, dispatch, error, isUpdated]);

    const changePassword = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("confirmPassword", confirmPassword);

        dispatch(changePasswordAction(formData));
    }

    return (
        <>
            <div className="changePasswordContainer">
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <div className="changePassword">
                            <h1>Change Password</h1>
                            <form className="changePasswordForm" onSubmit={changePassword}>
                                <div className="oldPassword">
                                    <VpnKey />
                                    <input
                                        type='password'
                                        required
                                        placeholder='Password'
                                        name='oldPassword'
                                        value={oldPassword}
                                        onChange={(e) => setOldpassword(e.target.value)}
                                    />
                                </div>
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
                                    className='changePasswordSubmit'
                                />
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ChangePassword