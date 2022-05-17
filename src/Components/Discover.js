import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Slider } from '@material-ui/core'
import "../css/discover.css"
import "../css/mobile.css"
import MovieShell from './MovieShell';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



const Discover = () => {

  //GENERAL DECLARATIONS
  const [width, setWidth] = React.useState(window.innerWidth);
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
  const [genreOverview, setGenreOverview] = useState([])
  const [filterGenre, setFilterGenre] = useState("")
  const [search, setSearch] = useState('')
  const [genreCollapse, setGenreCollapse] = useState(false)



  //MOBILE DECLARATIONS
  const [mobileDiscover, setMobileDiscover] = useState([])


  // API REQUESTS
  const apiKey = 'f78a7122e289d7d5eff2ba85c984f4ba'
  const baseUrl = 'https://api.themoviedb.org/3'
  const discoverFetch = `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${filterGenre}&include_adult=false&include_video=false&page=${page}&release_date.gte=${fromReleaseYear}&release_date.lte=${toReleaseYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`




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


  useEffect(() => {
    const Discover = async () => {
      const response = await fetch(discoverFetch);
      const resJson = await response.json();
      console.log(resJson)
      setDiscoverMovies(resJson.results);
      setMobileDiscover(resJson.results.slice(0, 15))
    }
    Discover()
  }, [minRating, maxRating, fromReleaseYear, toReleaseYear, page, filterGenre])
  useEffect(() => {
    const Genres = async () => {
      const response = await fetch(
        `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const resJson = await response.json();
      setGenre(resJson.genres.slice(8));
      setGenreOverview(resJson.genres.slice(0, 8))
    };
    Genres();
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const searchFilter = x => {
    let moviename = x.original_title, seriesname = x.name;
    if (moviename) {
      if (moviename.toLowerCase().includes(search.toLowerCase())) {
        return x
      }
    }
    if (seriesname) {
      if (seriesname.toLowerCase().includes(search.toLowerCase())) {
        return x
      }
    }
    else if (moviename && seriesname === "") { return x }
  }

  const JumpTenPageFunction = () => {
    page > 10 ? setPage(page - 10) : setPage(1)
  }
  const JumpOnePageFunction = () => {
    page > 1 ? setPage(page - 1) : setPage(1)
  }

  const handleFilters = () => {
    addFilters ? setAddFilters(false) : setAddFilters(true)
    setAddFilters(!addFilters)
  }

  return (
    <>
      <Navbar handleChange={handleChange} />
      {width < breakpoint ? (
        <>
          {/* MOBILE VIEW */}
          <div className="mobile-discover-wrapper">
            <div className="mobile-filter-section">{addFilters ? <>{genreCollapse ? <>
              <div className="mobile-genres-div">
                {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                {genre.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View {genreCollapse ? "Less" : `${genre.length} More`}</button></div>
            </> : (<>
              <div className="mobile-genres-div">
                {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View {genreCollapse ? "Less" : `${genre.length} More`}</button></div>


            </>

            )} <h2>Rating</h2>
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



            </> : <h1 onClick={handleFilters} >Add Filters +</h1>}</div>

            <div className="mobile-discover-section">
              {mobileDiscover.filter(x => searchFilter(x)).map(x => {
                return (
                  <MovieShell key={x.id} {...x} />
                )
              })}
            </div>
            <div className='buttons'>
              <button onClick={() => JumpTenPageFunction()}><FaArrowLeft /><FaArrowLeft /></button>
              <button onClick={() => JumpOnePageFunction()}><FaArrowLeft /></button>
              <p className='current-page'>{page}</p>
              <button onClick={() => setPage(page + 1)}><FaArrowRight /></button>
              <button onClick={() => setPage(page + 10)}><FaArrowRight /><FaArrowRight /></button>
            </div>
          </div>

        </>
      ) : (<>


        {/* PC VIEW */}
        <div className="discover-component-wrapper">
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
                    {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                    {genre.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                  </div>
                </>
                  : (<>
                    <div className="genres-div">
                      {genreOverview.map(x => { return <button key={x.id} onClick={() => { setFilterGenre(x.id); }} className='genre-button'>{x.name}</button> })}
                    </div>
                  </>)
                }
                <button className='discover-view-more-button' onClick={() => setGenreCollapse(!genreCollapse)}>View  {genreCollapse ? "Less" : `${genre.length} More`}</button>
              </div>
            </div>
          </div>
          <div className="discover-movies">
            <h1 className='section-title' >Discover</h1>
            <div className="discover-separation-line"></div>
            <div className="discover-movies-content">
              {discoverMovies.filter(x => searchFilter(x)).map(x => {
                return (
                  <MovieShell key={x.id} {...x} />
                )
              })}
            </div>
            <div className='buttons'>
              <button onClick={() => JumpTenPageFunction()}><FaArrowLeft /><FaArrowLeft /></button>
              <button onClick={() => JumpOnePageFunction()}><FaArrowLeft /></button>
              <p className='current-page'>{page}</p>
              <button onClick={() => setPage(page + 1)}><FaArrowRight /></button>
              <button onClick={() => setPage(page + 10)}><FaArrowRight /><FaArrowRight /></button>
            </div>
          </div>
        </div>
      </>
      )
      }</>)
}

export default Discover