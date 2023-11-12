import React from 'react'
import "../styles/header.css"

const Header = ({logOutFunc}) => {
  return (
    <div className='header'>

        
        <div className='title'><p>Private Chat Room</p></div>

       

        <button className="logOut" type="button" onClick={logOutFunc}>Log out</button>
        
    </div>
  )
}

export default Header