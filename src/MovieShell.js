import React, { useState } from 'react'


const MovieShell = ({id,poster,title,name,checkedID,rating,releaseDate,airDate}) => {
   const [isShown, setIsShown] = useState(false); 
  let img = `http://image.tmdb.org/t/p/w200/${poster}`
  // Release date fix
  return (
    <div key={id}>
    <div className="movieshell-container">
      <div  className='movieshell-content'  onMouseEnter={() => {setIsShown(true)}} onMouseLeave={() => {setIsShown(false)}}>
    <img src={img}  alt={title} style={{display:'block',borderRadius:'10px'}} className='poster-image'/>
    {isShown && ( 
      <div className='overlay'>
          <h4 className='text'>{title}</h4>
          <h4 className='text'>{name}</h4> 
          <h4 className='text'>{releaseDate}</h4>
          <h4 className='text'>{airDate}</h4>
          <h4 className="text">Rating: {rating}</h4>
          <h4 className='text'>{() => checkedID()}</h4> 
        </div>
     )} 
     </div>
     </div>
    </div>
  )
}


export default MovieShell