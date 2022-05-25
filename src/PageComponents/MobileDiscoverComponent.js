import React from 'react';
import { Slider } from '@material-ui/core';
import MovieShell from '../ReusableComponents/MovieShell';
import { PaginationComponent } from '../Utilities/PaginationComponent';

export const MobileDiscoverComponent = (addFilters, genreCollapse, genreOverview, setFilterGenre,
  genre, setGenreCollapse, minRating, updateMinRating, maxRating, updateMaxRating, fromReleaseYear,
  updatefromReleaseYear, toReleaseYear, updateToReleaseYear, handleFilters,
  mobileDiscover, searchFilter, page, setPage) => {
  return (
    <div className="mobile-discover-wrapper">
      <div className="mobile-filter-section">{addFilters ? <>{genreCollapse ? <>
        <div className="mobile-genres-div">
          {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
          {genre.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
          <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View {genreCollapse ? "Less" : `${genre.length} More`}</button>
        </div>
      </> : (
        <>
          <div className="mobile-genres-div">
            {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
            <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View {genreCollapse ? "Less" : `${genre.length} More`}</button>
          </div>
        </>

      )}
        <h2>Rating</h2>

        <div className="mobile-input-range-div">
          <h3>Min: {minRating}</h3>
          <Slider className='range-input' size="medium" min={1} max={10} value={minRating} onChange={updateMinRating} />
        </div>
        <div className="mobile-input-range-div">
          <h3>Max: {maxRating}</h3>
          <Slider className='range-input' size="medium" min={1} max={10} value={maxRating} onChange={updateMaxRating} />
        </div>

        <h2>Release Year</h2>

        <div className="mobile-input-range-div">
          <h3>From {fromReleaseYear}</h3>
          <Slider className='range-input' size="medium" min={1932} max={2022} value={fromReleaseYear} onChange={updatefromReleaseYear} />
        </div>
        <div className="mobile-input-range-div">
          <h3>To {toReleaseYear}</h3>
          <Slider className='range-input' size="medium" min={1932} max={2022} value={toReleaseYear} onChange={updateToReleaseYear} />
        </div>

        <h1 style={{ textAlign: 'center' }} onClick={handleFilters}>Close Filters</h1>
        <div className="mobile-separation-line"></div>
      </> :
        <h1 onClick={handleFilters}>Add Filters +</h1>}
      </div>
      <div className="mobile-discover-section">
        {mobileDiscover.filter(x => searchFilter(x)).map(x => {
          return (
            <MovieShell key={x.id} {...x} />
          );
        })}
      </div>
      {PaginationComponent(page, setPage)}
    </div>)
}
