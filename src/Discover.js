import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Slider } from '@material-ui/core'
import "./discover.css"

const Discover = () => {
  const [minRating,setMinRating] = useState([1])
  const [maxRating,setMaxRating] = useState([10])
  const [fromReleaseYear,setFromReleaseYear] = useState([1932])
  const [toReleaseYear,setToReleaseYear] = useState([2022])
  const [discoverMovies,setDiscoverMovies] = useState([])
  const [page,setPage] = useState(1)
  const [search, setSearch] = useState('')
  const updateMinRating = (e,data) => {
    setMinRating(data)
  }
  const updateMaxRating = (e,data) => {
    setMaxRating(data)
  }
  const updatefromReleaseYear = (e,data) => {
    setFromReleaseYear(data)
  }
  const updateToReleaseYear = (e,data) => {
    setToReleaseYear(data)
  }
  
  useEffect(() => {
    const Discover = async () => {
      const response = await fetch(
      `
      https://api.themoviedb.org/3/discover/movie?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&release_date.gte=${fromReleaseYear}&release_date.lte=${toReleaseYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`        
      );
      const resJson = await response.json();
      console.log(response)
      setDiscoverMovies(resJson.results);}
      Discover()
  },[minRating,maxRating,fromReleaseYear,toReleaseYear])
  const handleChange = (e) => {
    setSearch(e.target.value)}

  const searchFilter = x => {
    let moviename = x.original_title
    let seriesname = x.name
    if(moviename){
      if( moviename.toLowerCase().includes(search.toLowerCase())){
      // console.log(moviename)
        return x}}
      if(seriesname) {
          if( seriesname.toLowerCase().includes(search.toLowerCase()))
          {
         {
           return x}
      }}
      else if(moviename && seriesname == "")
      {return x}
    }
  
  return (
      <>
      <Navbar handleChange={handleChange}/>

      <div className="discover-component-wrapper">
      <div className="filter">
        <div className="filter-container">
          <h1>Filter</h1>
          <div className="separation-line"></div>
          <h3>Rating</h3>
          <div className="input-range-div">
            <h3>Min: {minRating}</h3>
            <Slider className='range-input'  size="medium" min={1} max={10} value={minRating} onChange={updateMinRating}/>
          </div>
          <div className="input-range-div">
            <h3>Max: {maxRating}</h3>
            <Slider className='range-input'  size="medium" min={1} max={10} value={maxRating} onChange={updateMaxRating}/>
          </div>
          <h3>Release Year</h3>
          <div className="input-range-div">
            <h3>From {fromReleaseYear}</h3>
            <Slider  className='range-input'  size="medium"  min={1932} max={2022} value={fromReleaseYear} onChange={updatefromReleaseYear}/>
          </div>
          <div className="input-range-div">
            <h3>To {toReleaseYear}</h3>
            <Slider className='range-input' size="medium" min={1932} max={2022} value={toReleaseYear} onChange={updateToReleaseYear}/>
          </div>
          </div>
          </div>
          <div className="discover-movies">
          <h1 className='Movies-h1' >Discover</h1>
          <div className="discover-separation-line"></div>
          <div className="discover-movies-content">
            {discoverMovies.filter(x=> searchFilter(x)).map(x => { 
              return (<>
            <img src={`http://image.tmdb.org/t/p/w200/${x.poster_path || x.backdrop_path}`}></img> 
            {/* <img className='yes' src={`http://image.tmdb.org/t/p/w300/${x.backdrop_path}`}></img>  */}
            
            </>)})}
          </div>
          </div>
          </div>
      </>
  )
}

export default Discover