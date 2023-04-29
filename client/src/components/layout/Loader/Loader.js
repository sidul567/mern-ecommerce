import React from 'react'
import './Loader.css';
import { ThreeCircles } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='spinner'>
        <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="rgb(110,110,110)"
            innerCircleColor="rgb(110,110,110)"
            middleCircleColor="rgb(110,110,110)"
        />
    </div>
  )
}

export default Loader