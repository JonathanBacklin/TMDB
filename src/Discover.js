import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Discover = () => {
    const [trending, setTrending] = useState([])
    const [topVoted, setTopVoted] = useState([])
    const [recent, setRecent] = useState([])
    const [search, setSearch] = useState('')
  return (
      <>
    <div className="navbar-container">
        <div className="navbar-content">
          <div>
              <Link to="/" style={{textDecoration:'none'}}><h1 style={{margin:'0',color:'white',}}>Movies</h1></Link>
          </div>
          <div className='navbar-links'>
              <Link to="/" style={{color:'white',fontSize:'24px'}}>Home</Link>
              <Link to="/Discover" style={{color:'white',fontSize:'24px',textDecoration:'none'}}>Discover</Link>
          </div>
          <div className="search-bar-div">
            <input type="text" className='search-bar' onChange={(e) => setSearch(e.target.value)} placeholder='Search'/>
          </div>
        </div>
      </div>
      <div className="App">
            
          <h1>Add Filters</h1>
          <div className="separation-line"></div>


      </div>
      </>
  )
}

export default Discover