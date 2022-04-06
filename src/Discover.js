import React, { useState } from 'react'
import Navbar from './Navbar';
import { Slider } from '@material-ui/core'

const Discover = () => {
  const [minRating,setMinRating] = useState([0])
  const [maxRating,setMaxRating] = useState([0])
  const updateMinRating = (e,data) => {
    setMinRating(data)
  }
  const updateMaxRating = (e,data) => {
    setMaxRating(data)
  }
  return (
      <>
      <Navbar />
      <div className="filter">
          <h1>Filter</h1>
          <div className="separation-line"></div>
          <div className="input-range-div">
            <h1>Min: {minRating}</h1>
            <Slider size="medium" max={10} value={minRating} onChange={updateMinRating}/>
          </div>
          <div className="input-range-div">
            <h1>Max: {maxRating}</h1>
            <Slider size="medium" max={10} value={maxRating} onChange={updateMaxRating}/>
          </div>
         


          </div>
      </>
  )
}

export default Discover