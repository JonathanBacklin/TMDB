import React from 'react';
import { Slider } from '@material-ui/core';

export const DisplayRatings = (width, breakpoint, minRating, updateMinRating, maxRating, updateMaxRating, fromReleaseYear, updatefromReleaseYear, toReleaseYear, updateToReleaseYear) => {
  return (
    <>
      {width > breakpoint ?
        <>
          <h1>Filter</h1>
          <div className="separation-line" />
        </>
        :
        null
      }
      <div style={width > breakpoint ? {} : { width: '50%' }}>
        <h2>Rating</h2>
        <div className="input-range-div">
          <h3>Min: {minRating}</h3>
          <Slider className='range-input' size="medium" min={1} max={10} value={minRating} onChange={updateMinRating} />
        </div>
        <div className="input-range-div">
          <h3>Max: {maxRating}</h3>
          <Slider className='range-input' size="medium" min={1} max={10} value={maxRating} onChange={updateMaxRating} />
        </div>
        <h2>Release Year</h2>
        <div className="input-range-div">
          <h3>From {fromReleaseYear}</h3>
          <Slider className='range-input' size="medium" min={1932} max={2022} value={fromReleaseYear} onChange={updatefromReleaseYear} />
        </div>
        <div className="input-range-div">
          <h3>To {toReleaseYear}</h3>
          <Slider className='range-input' size="medium" min={1932} max={2022} value={toReleaseYear} onChange={updateToReleaseYear} />
        </div>
      </div>
    </>)
};
