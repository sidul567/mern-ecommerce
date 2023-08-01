import React, { useState } from 'react'
import './Contact.css';
import contact_us from '../../images/contact_us.svg';
import { DriveFileRenameOutline, MailOutline, Message, Phone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOST } from '../../host';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const contactFormSubmit = async (e)=>{
        e.preventDefault();

        setLoading(true);
        try{
            const {data} = await axios.post(HOST+'/api/v1/contact',{name, email, message},{
                'headers': {
                    'Content-Type': 'application/json'
                },
                'withCredentials': true,
            });
            setLoading(false);
            toast.success(data.message);
        }catch(err){
            setLoading(false);
            toast.error(err.message);
        }
    }

  return (
    <>
        {loading && <Loader />}
        <div className="homeHeading">Contact Us</div>
        <div className='contact_us'>
            <div className="side1">
                <img src={contact_us} alt="Contact Us" />
            </div>
            <div className="side2">
                <div className="phone">
                    <Phone />
                    <h2>By Phone</h2>
                    <Link to="tel:+01812345678">+01812345678</Link>
                </div>
                <div className="email">
                    <MailOutline />
                    <h2>By Email</h2>
                    <Link to="mailto:sidul246@gmail.com">sidul246@gmail.com</Link>
                </div>
            </div>
            <div className="side3">
                <h2>Send Us a Message!</h2>
                <form className='loginForm' onSubmit={contactFormSubmit}>
                    <div className="loginEmail">
                        <DriveFileRenameOutline />
                        <input
                            type="text"
                            required
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="loginEmail">
                        <MailOutline />
                        <input
                            type="email"
                            required
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="message">
                        <textarea name="" id="" cols="30" rows="5" placeholder='Enter message...' value={message}
                            onChange={(e)=>setMessage(e.target.value)} required></textarea>
                    </div>
                    <input
                        type="submit"
                        value="Send Message"
                        className='loginSubmit'
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default Contact