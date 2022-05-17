import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import "../css/navbar.css"

const Navbar = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navbarToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleSearchbar = () => {

  }
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><h1 >Movies</h1></Link>
        </div>
        <div className={`navbar-links ${isOpen ? 'showMenu' : ""}`}>
          <Link to="/" className='navbar-link'>Home</Link>
          <Link to="/Discover" className='navbar-link'>Discover</Link>
        </div>
        <div className="search-bar-div">
          <input type="text" className='search-bar' onChange={handleChange} placeholder="Search..." />
          <FaSearch id='search-icon' onClick={handleSearchbar} />
        </div>
        <div style={{ position: 'relative', zIndex: '11' }}>
          <button onClick={navbarToggle} className='navbar-button'>{isOpen ? <MdClose /> : <FiMenu />}</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar