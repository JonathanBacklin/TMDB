// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = ({search,trending,topVoted,recent}) => {

// //     const combined = [...trending.map(i => {id: i.id; type: "trending"}), ...topVoted.map(i => {id: i.id; type: "topvoted"}),
// //      ...recent.map(i => {id: i.id; type: "recent"})]
// //    let filteredMovies =  combined.filter((x) => {search.name.toLowerCase().includes(search.toLowerCase())})
//     return (
//     <div className="navbar-container">
//             <div className="navbar-content">
//                 <div>
//                     <h1 style={{margin:'0',color:'white'}}>Movies</h1>
//                 </div>
//                 <div className='navbar-links'>
//                     <Link to="/" style={{color:'white',fontSize:'25px'}}>Home</Link>
//                     <Link to="/Discover" style={{color:'white',fontSize:'25px',textDecoration:'none'}}>Discover</Link>
//                 </div>
//                 <div className="search-bar-div">
//                     <input type="search" className='search-bar' onChange={() => {setSearch(e.target.value)}} placeholder='Search'/>
                    
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default Navbar