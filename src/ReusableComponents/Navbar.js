import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import "../css/navbar.css"

const Navbar = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openSearchBar, setOpenSearchBar] = useState(false)

  const navbarToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleSearchbar = () => {
    setOpenSearchBar(!openSearchBar)
  }
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-content">
          <div>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}><h1 >Movies</h1></NavLink>
          </div>
          <div className={`navbar-links ${isOpen ? 'showMenu' : ""}`}>
            <NavLink to="/" className='navbar-link'>Home</NavLink>
            <NavLink to="/Discover" className='navbar-link'>Discover</NavLink>
          </div>
          <div className="search-bar-div">
            <input type="text" className='search-bar' onChange={handleChange} placeholder="Search..." />
            <FaSearch id='search-icon' onClick={handleSearchbar} />
          </div>
          <div className='responsive-navbar-button-wrapper'>
            <button onClick={handleSearchbar} style={{ background: 'transparent', border: 'none' }}>{openSearchBar ? <MdClose style={{ fontSize: '30px', color: 'white' }} /> : <FaSearch style={{ fontSize: '22px', color: 'white' }} />}</button>

            <button onClick={navbarToggle} className='navbar-button'>{isOpen ? <MdClose /> : <FiMenu />}</button>
          </div>
        </div>
      </div>
      <input type="text" className={`mobile-search-bar ${openSearchBar ? "opened-search-bar" : "hidden-search-bar"}`} onChange={handleChange} placeholder="Search..." />
    </>
  )
}

export default Navbar