import React, { useEffect, useRef, useState } from 'react'
import { FaceOutlined, LockOpenOutlined, MailOutline, RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginSignUp.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginAction, signUpAction } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';

function LoginSignUp() {
    const { isLoading, error, isAuthenticate } = useSelector(state => state.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const switcherTab = useRef(null);
    const loginTab = useRef(null);
    const signUpTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [avatar, setAvatar] = useState("/profile.jpg");
    const [avatarPreview, setAvatarPreview] = useState("profile.jpg");
    const passwordField = useRef("");
    const [hide, setHide] = useState(true);
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "account";
    const { name, email, password } = user;

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticate) {
            navigate("/"+redirect);
        }
    }, [dispatch, error, isAuthenticate, navigate, redirect])

    const switchTab = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add("shiftToOriginal");
            switcherTab.current.classList.remove("shiftToRight");

            signUpTab.current.classList.remove("shiftToOriginalForm");
            loginTab.current.classList.remove("shiftToLeft");
        } else if (tab === 'signup') {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToOriginal");

            signUpTab.current.classList.add("shiftToOriginalForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const login = (e) => {
        e.preventDefault();
        dispatch(loginAction(loginEmail, loginPassword));
    }

    const signUp = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);

        dispatch(signUpAction(formData));
    }

    const signUpChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(e.target.files[0]);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    const visiblePassword = ()=>{
        const type = passwordField.current.getAttribute("type") === "password" ? "text" : "password";
        passwordField.current.setAttribute("type",type);
        setHide(!hide);
    }

    return (
        <>
            <div className="loginSignUpContainer">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="loginSignUp">
                        <div>
                            <div className="loginSignUpToggle">
                                <p onClick={(e) => switchTab(e, "login")}>Login</p>
                                <p onClick={(e) => switchTab(e, "signup")}>Sign Up</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className='loginForm' ref={loginTab} onSubmit={login}>
                            <div className="loginEmail">
                                <MailOutline />
                                <input
                                    type="email"
                                    required
                                    name='email'
                                    placeholder='Email'
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenOutlined />
                                <input
                                    type='password'
                                    required
                                    placeholder='Password'
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    ref={passwordField}
                                />
                                {loginPassword && (<>
                                    {hide ? <RemoveRedEyeOutlined onClick={visiblePassword} /> : <VisibilityOffOutlined onClick={visiblePassword} />}
                                </>)}
                            </div>
                            <Link to="/password/forget">Forget Password ?</Link>
                            <input
                                type="submit"
                                value="Login"
                                className='loginSubmit'
                            />
                        </form>
                        <form className="signUpForm" ref={signUpTab} onSubmit={signUp} encType='multipart/form-data'>
                            <div className="signUpName">
                                <FaceOutlined />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    name='name'
                                    value={name}
                                    onChange={signUpChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <MailOutline />
                                <input
                                    type="email"
                                    required
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    onChange={signUpChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <LockOpenOutlined />
                                <input
                                    type='password'
                                    required
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={signUpChange}
                                />
                            </div>
                            <div className="signUpImage">
                                <img src={avatarPreview} alt="" />
                                <input
                                    type="file"
                                    name='avatar'
                                    accept='image/*'
                                    onChange={signUpChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Sign Up"
                                className='signUpSubmit'
                            />
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default LoginSignUp