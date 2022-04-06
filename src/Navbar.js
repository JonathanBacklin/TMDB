 import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa';

 const Navbar = ({handleChange}) => {
     return (
     <div className="navbar-container">
       <div className="navbar-container">
        <div className="navbar-content">
          <div>
              <Link to="/" style={{textDecoration:'none',color:'white'}}><h1 >Movies</h1></Link>
          </div>
          <div className='navbar-links'>
              <Link to="/" style={{color:'white',fontSize:'24px'}}>Home</Link>
              <Link to="/Discover" style={{color:'white',fontSize:'24px',textDecoration:'none'}}>Discover</Link>
          </div>
          <div className="search-bar-div">
            <input type="text"  className='search-bar' onChange={handleChange} placeholder="Search..."/>
            <FaSearch id='search-icon'/>
            </div>
        </div>
      </div> 
         </div>
   )
 }

 export default Navbar