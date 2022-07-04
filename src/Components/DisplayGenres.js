import React from 'react';

export const DisplayGenres = (genreCollapse, genre, setFilterGenre, setGenreCollapse) => {
  return <div className={`genres-wrapper`}>
    {genreCollapse ? <>
      <div className="genres-div">
        {genre.slice(0, 8).map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
        {genre.slice(8).map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
        <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View  {genreCollapse ? "Less" : `${genre.length} More`}</button>
      </div>
    </>
      : (<>
        <div className="genres-div">
          {genre.slice(0, 8).map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button>; })}
          <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View  {genreCollapse ? "Less" : `${genre.length} More`}</button>
        </div>
      </>)}
  </div>;
};
