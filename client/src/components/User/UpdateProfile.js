import React, { useEffect, useState } from 'react'
import { FaceOutlined, MailOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateProfile.css'
import { toast } from 'react-toastify';
import { clearErrors, loadUser, updateProfileAction } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import Loader from '../layout/Loader/Loader';

function UpdateProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("profile.jpg");
    const { user, isAuthenticate } = useSelector(state => state.userDetails);
    const { error, isUpdated, isLoading } = useSelector(state => state.profileDetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (!isAuthenticate) {
            navigate("/login");
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Profile updated successfully!");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [user, isAuthenticate, navigate, dispatch, error, isUpdated]);

    const updateProfile = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("avatar", avatar);

        dispatch(updateProfileAction(formData));
    }

    const updateProfileChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(e.target.files[0]);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="updateProfileContainer">
                            <div className="updateProfile">
                                <h1>Update Profile</h1>
                                <form className="updateProfileForm" onSubmit={updateProfile} encType='multipart/form-data'>
                                    <div className="updateProfileName">
                                        <FaceOutlined />
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="updateProfileEmail">
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
                                    <div className="updateProfileImage">
                                        <img src={avatarPreview} alt="" />
                                        <input
                                            type="file"
                                            name='avatar'
                                            accept='image/*'
                                            onChange={updateProfileChange}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update Profile"
                                        className='updateProfileSubmit'
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UpdateProfile