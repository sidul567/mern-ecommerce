import React, { useEffect, useState } from 'react'
import Payment from './Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HOST } from '../../host';

function PaymentContainer() {
    const [stripeApiKey, setStripeApiKey] = useState("");

    const getStripeApiKey = async () => {
        const { data } = await axios.get(HOST + "/api/v1/stripeapikey", {
            'withCredentials': true,
        });
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
    })
    return (
        <>
            {
                stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                    </Elements>
                )
            }
        </>
    )
}

export default PaymentContainer