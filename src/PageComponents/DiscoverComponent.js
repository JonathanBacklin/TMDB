import React from 'react';
import { Slider } from '@material-ui/core';
import MovieShell from '../ReusableComponents/MovieShell';
import { PaginationComponent } from '../Utilities/PaginationComponent';

export const DiscoverComponent = (minRating, updateMinRating, maxRating, updateMaxRating,
  fromReleaseYear, updatefromReleaseYear, toReleaseYear, updateToReleaseYear, genreCollapse,
  genreOverview, setFilterGenre, genre, setGenreCollapse, discoverMovies, searchFilter, page, setPage) => {
  return <div className="discover-component-wrapper">
    <div className="filter">
      <div className="filter-container">
        <h1>Filter</h1>
        <div className="separation-line"></div>
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
        <div className="genres-wrapper">
          {genreCollapse ? <>
            <div className="genres-div">
              {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
              {genre.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
            </div>
          </>
            : (<>
              <div className="genres-div">
                {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
              </div>
            </>)}
          <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View  {genreCollapse ? "Less" : `${genre.length} More`}</button>
        </div>
      </div>
    </div>
    <div className="discover-movies">
      <h1 className='section-title'>Discover</h1>
      <div className="discover-separation-line" />
      <div className="discover-movies-content">
        {discoverMovies.filter(x => searchFilter(x)).map(x => {
          return (
            <MovieShell key={x.id} {...x} />
          );
        })}
      </div>
      {PaginationComponent(page, setPage)}
    </div>
  </div>;
}
