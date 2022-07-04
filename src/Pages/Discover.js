import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import "../css/discover.css"
import "../css/mobile.css"
import { SearchFunction } from '../Utilities/SearchFunction';
import { UseResizeWindowFunction } from '../Utilities/UseResizeWindowFunction';
import MovieShell from '../Components/MovieShell';
import { DiscoverPagination } from '../Components/DiscoverPagination';
import { DisplayGenres } from '../Components/DisplayGenres';
import { DisplayRatings } from '../Components/DisplayRatings';
import { DiscoverFetch, GenresFetch } from '../Utilities/API';



const Discover = () => {
  //GENERAL DECLARATIONS
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1200;

  //FILTER DECLARATIONS
  const [minRating, setMinRating] = useState([1])
  const [maxRating, setMaxRating] = useState([10])
  const [fromReleaseYear, setFromReleaseYear] = useState([1932])
  const [toReleaseYear, setToReleaseYear] = useState([2022])
  const [addFilters, setAddFilters] = useState(false)


  //DISCOVER DECLARATIONS
  const [discoverMovies, setDiscoverMovies] = useState([])
  const [page, setPage] = useState(1)
  const [genre, setGenre] = useState([])
  const [filterGenre, setFilterGenre] = useState("")
  const [search, setSearch] = useState('')
  const [genreCollapse, setGenreCollapse] = useState(false)

  // API REQUESTS
  const APIKEY = 'f78a7122e289d7d5eff2ba85c984f4ba'
  const BASEURL = 'https://api.themoviedb.org/3'


  const searchFilter = SearchFunction(search)

  UseResizeWindowFunction(setWidth);

  const updateMinRating = (e, data) => {
    setMinRating(data)
  }
  const updateMaxRating = (e, data) => {
    setMaxRating(data)
  }
  const updatefromReleaseYear = (e, data) => {
    setFromReleaseYear(data)
  }
  const updateToReleaseYear = (e, data) => {
    setToReleaseYear(data)
  }

  // API REQUESTS
  const Genres = GenresFetch(setGenre);
  const Discover = DiscoverFetch(BASEURL, APIKEY, filterGenre, page, fromReleaseYear, toReleaseYear, minRating, maxRating, setDiscoverMovies)

  useEffect(() => {
    Genres();
    Discover()
  }, [minRating, maxRating, fromReleaseYear, toReleaseYear, page, filterGenre]);




  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleFilters = () => {
    addFilters ? setAddFilters(false) : setAddFilters(true)
    setAddFilters(!addFilters)
  }

  return (
    <>

      {/* fixa mobile filmer så det är 3 på rad */}
      <Navbar handleChange={handleChange} />
      <div className={width > breakpoint ? `discover-component-wrapper` : `mobile-discover-wrapper`}>
        <div className="filter-container">
          {/* width > breakpoint ? addfilters h1 ändra display none på hela filter grejen */}
          {width > breakpoint ?
            <div className="filter">
              {DisplayRatings(width, breakpoint, minRating, updateMinRating, maxRating, updateMaxRating, fromReleaseYear, updatefromReleaseYear, toReleaseYear, updateToReleaseYear)}
              {DisplayGenres(genreCollapse, genre, setFilterGenre, setGenreCollapse)}
            </div>
            :
            <>
              {addFilters ?
                <>
                  {DisplayGenres(genreCollapse, genre, setFilterGenre, setGenreCollapse)}
                  {DisplayRatings(width, breakpoint, minRating, updateMinRating, maxRating, updateMaxRating, fromReleaseYear, updatefromReleaseYear, toReleaseYear, updateToReleaseYear)}
                  <h1 className='discover-toggle-h1' onClick={handleFilters}>Close Filters -</h1>
                </>
                :
                <h1 className='discover-toggle-h1' onClick={handleFilters}>Add Filters +</h1>
              }
            </>
          }
        </div>
        <div className="discover-movies">
          {width > breakpoint ? <h1 className='section-title'>Discover</h1> : null}
          <div className="discover-separation-line" />
          <div className="discover-movies-content">
            {width > breakpoint ? (
              discoverMovies.filter(x => searchFilter(x)).map(x => {
                return (
                  <MovieShell key={x.id} {...x} />
                );
              })
            )
              :
              discoverMovies.slice(0, 15).filter(x => searchFilter(x)).map(x => {
                return (
                  <MovieShell key={x.id} {...x} />
                );
              })

            }
          </div>
          {DiscoverPagination(page, setPage)}
        </div>
      </div>
    </>
  )
}

export default Discover











