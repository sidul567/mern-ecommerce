import React from 'react'
import {ReactNavbar} from 'overlay-navbar';
import {FaCartPlus, FaSearch, FaUserAlt} from 'react-icons/fa'
import logo from '../../../images/logo.png'; 
function Header() {
  return (
    <ReactNavbar 
      logo = {logo}
      burgerColor="#ff6347" 
      burgerColorHover="#ff6347"
      logoWidth = "20vmax"
      navColor1 = "white"
      logoHoverSize = "10px"
      logoHoverColor = "rgba(0,0,0,0)"
      link1Text = "Home"
      link2Text = "Products"
      link3Text = "Contact"
      link4Text = "About"
      link1Url = "/"
      link2Url = "/products"
      link3Url = "/contact"
      link4Url = "/about"
      link1Size = "1.3vmax"
      link1Color = "rgba(35,35,35,0.8)"
      nav1justifyContent = "flex-end"
      nav2justifyContent = "flex-end"
      nav3justifyContent = "flex-start"
      nav4justifyContent = "flex-start"
      link1ColorHover = "#eb4034"
      link1Margin = "1vmax"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      profileIconUrl = "/login"
      profileIconColor = "rgba(35,35,35,0.8)"
      searchIconColor = "rgba(35,35,35,0.8)"
      cartIconColor = "rgba(35,35,35,0.8)"
      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon ={true}
      CartIconElement ={FaCartPlus}
      profileIconColorHover = "#eb4034"
      searchIconColorHover = "#eb4034"
      cartIconColorHover = "#eb4034"
      cartIconMargin = "1vmax"
    />
  )
}

export default Header