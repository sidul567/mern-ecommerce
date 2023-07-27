import { LibraryAddCheckOutlined, LocalShippingOutlined } from '@mui/icons-material'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import './CheckoutStep.css';

function CheckoutStep({activeStep}) {
  const steps = [
    {label: <Typography>Shipping Info</Typography>, icon: <LocalShippingOutlined />},
    {label: <Typography>Confirm Order</Typography>, icon: <LibraryAddCheckOutlined />},
  ]

  return (
    <>
        <Stepper
            alternativeLabel
            activeStep={activeStep}
        >
        {
            steps.map((item, index)=>(
                <Step key={index} active={activeStep === index ? true :  false} completed={activeStep >= index ? true: false}>
                    <StepLabel icon={item.icon} style={{color: activeStep >= index ? "tomato" : "unset"}}>{item.label}</StepLabel>
                </Step>
            ))
        } 
        </Stepper>
    </>
  )
}

export default CheckoutStep