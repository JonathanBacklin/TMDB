import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const MovieShell = ({ media_type: mediaType, id, poster_path, backdrop_path, original_title, name, vote_average, release_date, first_air_date, checkedID }) => {
  const [isShown, setIsShown] = useState(false);
  // Release date fix

  mediaType = mediaType || 'movie';

  return (
    <div key={id}>
      <div className="movieshell-container">
        <div className='movieshell-content' onMouseEnter={() => { setIsShown(true) }} onMouseLeave={() => { setIsShown(false) }}>
          <Link to={`/${mediaType}/${id}`}>
            <img src={poster_path ? `http://image.tmdb.org/t/p/w200/${poster_path}` : `http://image.tmdb.org/t/p/w200/${backdrop_path}`} alt={original_title} style={{ display: 'block', borderRadius: '10px', color: 'white' }} className='poster-image' />
            {isShown && (
              <div className='overlay'>
                <h4 className='text'>{original_title}</h4>
                <h4 className='text'>{name}</h4>
                <h4 className='text'>{release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4)}</h4>
                {/* <h4 className='text'>{first_air_date}</h4> */}
                <h4 className="text">Rating: {vote_average}</h4>
                <h4 className="text">{checkedID}</h4>

              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}


export default MovieShell