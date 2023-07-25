import React, { useState } from 'react'
import { HomeOutlined, LocationCityOutlined, PhoneOutlined, PinDropOutlined, PublicOutlined, TransferWithinAStationOutlined } from '@mui/icons-material'
import './Shipping.css';
import { Country, State } from 'country-state-city';
import CheckoutStep from './CheckoutStep';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { shippingInfoAction } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';

function Shipping() {
    const dispatch = useDispatch();
    const {shippingInfo} = useSelector(state=>state.cart);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo ? shippingInfo.address : "");
    const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");
    const [pincode, setPincode] = useState(shippingInfo ? shippingInfo.pincode : "");
    const [phone, setPhone] = useState(shippingInfo ? shippingInfo.phone : "");
    const [country, setCountry] = useState(shippingInfo ? shippingInfo.country : "");
    const [state, setState] = useState(shippingInfo ? shippingInfo.state : "");

    const submitShippingInfo = (e)=>{
        e.preventDefault();

        if(phone.length !== 11){
            toast.error("Phone number length must be exact 11.");
            return;
        }

        dispatch(shippingInfoAction({address, city, country, state, phone, pincode}));
        navigate("/order/confirm");
    }

    return (
        <>
            <CheckoutStep activeStep={0} />
            <div className="shippingContainer">
                <div className="shipping">
                    <h1>Shipping Info</h1>
                    <form className="shippingForm" onSubmit={submitShippingInfo} encType='multipart/form-data'>
                        <div>
                            <HomeOutlined />
                            <input
                                type='text'
                                required
                                placeholder='Address'
                                name='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCityOutlined />
                            <input
                                type='text'
                                required
                                placeholder='City'
                                name='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDropOutlined />
                            <input
                                type='text'
                                required
                                placeholder='Pin Code'
                                name='pincode'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                        <div>
                            <PhoneOutlined />
                            <input
                                type='text'
                                required
                                placeholder='Phone'
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <PublicOutlined />
                            <select name="country" onChange={(e) => setCountry(e.target.value)} defaultValue={country || "Country"}>
                                <option disabled>Country</option>
                                {
                                    Country && Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            country && (
                                <div>
                                    <TransferWithinAStationOutlined />
                                    <select name="state" onChange={(e) => setState(e.target.value)} defaultValue={state || "State"}>
                                        <option disabled>State</option>
                                        {
                                            State && State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }

                        <input
                            type="submit"
                            value="Continue"
                            className='shippingSubmit'
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping