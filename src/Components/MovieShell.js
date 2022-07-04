import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UseResizeWindowFunction } from '../Utilities/UseResizeWindowFunction';

const MovieShell = (props) => {
  //DECLARATIONS
  const [isShown, setIsShown] = useState(false);
  let mediaType = props.media_type || 'movie';
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1100;
  UseResizeWindowFunction(setWidth);

  return (
    <div key={props.id}>
      <div className="movieshell-container">
        <div className={`${width > breakpoint ? "mobile-movieshell-content" : "movieshell-content"}`} onMouseEnter={() => { setIsShown(true) }} onMouseLeave={() => { setIsShown(false) }}>
          <Link to={`/${mediaType}/${props.id}`}>
            <img src={props.poster_path ? `http://image.tmdb.org/t/p/w200/${props.poster_path}` : `http://image.tmdb.org/t/p/w200/${props.backdrop_path}`}
              alt={props.original_title} style={{ display: 'block', borderRadius: '10px', color: 'white' }}
              className={`${width > breakpoint ? "poster-image" : "smaller-image"}`} />
            {isShown && (
              <div className='overlay'>
                <h4 className='text'>{props.original_title}</h4>
                <h4 className='text'>{props.name}</h4>
                <h4 className='text'>{props.release_date ? props.release_date.slice(0, 4) : props.first_air_date.slice(0, 4)}</h4>
                <h4 className="text">Rating: {props.vote_average}</h4>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default MovieShell