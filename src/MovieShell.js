import React, { useState } from 'react'


const MovieShell = ({id,poster_path,original_title,name,vote_average,release_date,first_air_date,checkedID}) => {
   const [isShown, setIsShown] = useState(false); 
  let img = `http://image.tmdb.org/t/p/w200/${poster_path}`
  // Release date fix
  return (
    <div key={id}>
    <div className="movieshell-container">
      <div  className='movieshell-content'  onMouseEnter={() => {setIsShown(true)}} onMouseLeave={() => {setIsShown(false)}}>
    <img src={img}  alt={original_title} style={{display:'block',borderRadius:'10px',color:'white'}} className='poster-image'/>
    {isShown && ( 
      <div className='overlay'>
          <h4 className='text'>{original_title}</h4>
          <h4 className='text'>{name}</h4> 
          <h4 className='text'>{release_date}</h4>
          <h4 className='text'>{first_air_date}</h4>
          <h4 className="text">Rating: {vote_average}</h4>
          <h4 className="text">{checkedID}</h4>
  
        </div>
     )} 
     </div>
     </div>
    </div>
  )
}


export default MovieShell