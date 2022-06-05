import React, { useEffect, useState } from 'react'
import Navbar from '../ReusableComponents/Navbar';
import "../css/discover.css"
import "../css/mobile.css"
import { SearchFunction } from '../Utilities/SearchFunction';
import { MobileDiscoverComponent } from '../PageComponents/MobileDiscoverComponent';
import { ResizeWindowFunction } from '../Utilities/ResizeWindowFunction';
import { DiscoverComponent } from '../PageComponents/DiscoverComponent';



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
  const [genreOverview, setGenreOverview] = useState([])
  const [filterGenre, setFilterGenre] = useState("")
  const [search, setSearch] = useState('')
  const [genreCollapse, setGenreCollapse] = useState(false)

  //MOBILE DECLARATIONS
  const [mobileDiscover, setMobileDiscover] = useState([])

  // API REQUESTS
  const APIKEY = 'f78a7122e289d7d5eff2ba85c984f4ba'
  const BASEURL = 'https://api.themoviedb.org/3'
  const discoverFetch = `${BASEURL}/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&with_genres=${filterGenre}&include_adult=false&include_video=false&page=${page}&release_date.gte=${fromReleaseYear}&release_date.lte=${toReleaseYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`
  const genresFetch = `${BASEURL}/genre/movie/list?api_key=${APIKEY}&language=en-US`
  const searchFilter = SearchFunction(search)

  ResizeWindowFunction(setWidth);

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
      const response = await fetch(genresFetch);
      const resJson = await response.json();
      setGenre(resJson.genres.slice(8));
      setGenreOverview(resJson.genres.slice(0, 8))
    };
    Genres();
  }, []);




  const handleChange = (e) => {
    setSearch(e.target.value)
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
          {MobileDiscoverComponent(
            addFilters,
            genreCollapse,
            genreOverview,
            setFilterGenre,
            genre,
            setGenreCollapse,
            minRating,
            updateMinRating,
            maxRating,
            updateMaxRating,
            fromReleaseYear,
            updatefromReleaseYear,
            toReleaseYear,
            updateToReleaseYear,
            handleFilters,
            mobileDiscover,
            searchFilter,
            page,
            setPage)}

        </>
      ) : (<>


        {/* PC VIEW */}
        {DiscoverComponent(minRating, updateMinRating, maxRating, updateMaxRating, fromReleaseYear, updatefromReleaseYear, toReleaseYear, updateToReleaseYear, genreCollapse, genreOverview, setFilterGenre, genre, setGenreCollapse, discoverMovies, searchFilter, page, setPage)}
      </>
      )
      }</>)
}

export default Discover





