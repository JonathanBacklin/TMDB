import React from 'react'

const DiscoverShell = ({poster_path,backdrop_path}) => {
  return (
    <div>
    <img src={`http://image.tmdb.org/t/p/w200/${poster_path}`}></img>  

    </div>
  )
}

export default DiscoverShell