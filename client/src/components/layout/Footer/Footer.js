import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'

function Footer() {
  return (
    <footer>
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download app for android phone and ios phone.</p>
            <img src={playStore} alt="" />
            <img src={appStore} alt="" />
        </div>
        <div className="midFooter">
            <h1>MERN-ECOMMERCE</h1>
            <p>Best performance is our main goal.</p>
            <p>Copyrights 2023 &copy; Sidul Islam Moon</p>
        </div>
        <div className="rightFooter">
            <h4>Follow me</h4>
            <a href="http://instagram.com">Instagram</a>
            <a href="http://youtube.com">Youtube</a>
            <a href="http://facebook.com">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer