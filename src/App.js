import React, { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import './css/App.css';
import './css/mobile.css';
import Footer from './Components/Footer';
import MovieShell from './Components/MovieShell';
import Navbar from './Components/Navbar';



function App() {
  //GENERAL DECLARATIONS
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1000;


  //PC MOVIE DECLARATIONS
  const [trending, setTrending] = useState([])
  const [trendingOverView, setTrendingOverView] = useState([])
  const [topVoted, setTopVoted] = useState([])
  const [topVotedOverView, setTopVotedOverView] = useState([])
  const [recent, setRecent] = useState([])
  const [recentOverView, setRecentOverView] = useState([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState([])
  const [trendingCollapse, setTrendingCollapse] = useState(false)
  const [topVotedCollapse, setTopVotedCollapse] = useState(false)
  const [recentCollapse, setRecentCollapse] = useState(false)
  const [trendingToggled, setTrendingToggled] = useState(false)
  const [topVotedToggled, setTopvotedToggle] = useState(false)
  const [recentToggled, setRecentToggled] = useState(false)


  //MOBILE MOVIE DECLARATIONS
  const [mobileTrending, setMobileTrending] = useState([])
  const [mobileTrendingOverView, setMobileTrendingOverView] = useState([])
  const [mobileTopVoted, setMobileTopVoted] = useState([])
  const [mobileTopVotedOverView, setMobileTopVotedOverView] = useState([])
  const [mobileRecent, setMobileRecent] = useState([])
  const [mobileRecentOverView, setMobileRecentOverView] = useState([])


  // API REQUESTS
  const BASEURL = 'https://api.themoviedb.org/3'
  const APIKEY = 'f78a7122e289d7d5eff2ba85c984f4ba'
  const trendingFetch = `${BASEURL}/trending/all/day?api_key=${APIKEY}&language=en-US&page=1`
  const topRatedFetch = `${BASEURL}/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`
  const recentFetch = `${BASEURL}/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
  const genresFetch = `${BASEURL}/genre/movie/list?api_key=${APIKEY}&language=en-US`





  // MY MANY API CALLS
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  useEffect(() => {

    const Trending = async () => {
      const response = await fetch(trendingFetch);
      const resJson = await response.json();
      setTrending(resJson.results.slice(5));
      setTrendingOverView(resJson.results.slice(0, 5))
      setMobileTrending(resJson.results.slice(3, 9))
      setMobileTrendingOverView(resJson.results.slice(0, 3))
    };
    Trending()
      ;
  }, []);
  useEffect(() => {

    const TopRated = async () => {
      const response = await fetch(topRatedFetch);
      const resJson = await response.json();
      setTopVoted(resJson.results.slice(5));
      setTopVotedOverView(resJson.results.slice(0, 5))
      setMobileTopVoted(resJson.results.slice(3, 9))
      setMobileTopVotedOverView(resJson.results.slice(0, 3))
    };
    TopRated();
  }, []);
  useEffect(() => {

    const Recent = async () => {
      const response = await fetch(recentFetch);
      const resJson = await response.json();
      setRecent(resJson.results.slice(5));
      setRecentOverView(resJson.results.slice(0, 5))
      setMobileRecent(resJson.results.slice(3, 9))
      setMobileRecentOverView(resJson.results.slice(0, 3))
    };
    Recent();
  }, []);
  useEffect(() => {

    const Genres = async () => {
      const response = await fetch(genresFetch);
      const resJson = await response.json();
      setGenre(resJson.genres);
    };
    Genres();
  }, []);

  const checkedID = x => {
    let test = genre.map((x) => x.id && x.name)
    if (test.includes(x.genre_ids)) {
      return test.name
    }

  }

  const searchFilter = x => {
    let moviename = x.original_title, seriesname = x.name;
    if (moviename) {
      if (moviename.toLowerCase().includes(search.toLowerCase())) { return x }
    }
    if (seriesname) {
      if (seriesname.toLowerCase().includes(search.toLowerCase())) {
        return x
      }
    } else if (moviename && seriesname === "") { return x }
  }


  const trendingSwitch = () => {
    trendingToggled ? setTrendingToggled(false) : setTrendingToggled(true)
    setTrendingCollapse(!trendingCollapse)
  }
  const topVotedSwitch = () => {
    topVotedToggled ? setTopvotedToggle(false) : setTopvotedToggle(true)
    setTopVotedCollapse(!topVotedCollapse)
  }
  const recentSwitch = () => {
    recentToggled ? setRecentToggled(false) : setRecentToggled(true)
    setRecentCollapse(!recentCollapse)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    setTrendingCollapse(true)
    setTopVotedCollapse(true)
    setRecentCollapse(true)
    setTrendingToggled(true)
    setTopvotedToggle(true)
    setRecentToggled(true)
  }
  return (
    <>
      <Navbar handleChange={handleChange} />
      <div className="App-container">
        {width < breakpoint ? (
          <>
            {/* MOBILE WIDTH */}

            {/* MOBILE TRENDING SECTION */}
            <div className="collapse-div" onClick={trendingSwitch}>
              <h1 className='section-title' >Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="mobile-separation-line" />

            {trendingCollapse ? (
              <>
                <div className="mobile-wrapper">
                  {mobileTrendingOverView.filter((x) => searchFilter(x))
                    .map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                  {mobileTrending.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}
                </div>
              </>) : (
              <div className='mobile-wrapper'>
                {mobileTrendingOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}
              </div>
            )}
            {/* MOBILE TOP VOTED SECTION */}
            <div className="collapse-div" onClick={topVotedSwitch} >
              <h1 className='section-title' >Top Voted</h1>
              <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="mobile-separation-line" />
            {topVotedCollapse ? (
              <>
                <div className="mobile-wrapper">
                  {mobileTopVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                  {mobileTopVoted.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                </div>

              </>) : (
              <div className='mobile-wrapper'>
                {mobileTopVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
              </div>
            )}

            {/* MOBILE NEWEST MOVIES SECTION */}
            <div className="collapse-div" onClick={recentSwitch}>
              <h1 className='section-title' >Newest</h1>
              <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="mobile-separation-line" />
            {recentCollapse ? (
              <>
                <div className="mobile-wrapper">
                  {mobileRecentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}
                  {mobileRecent.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                </div>
              </>) : (
              <div className='mobile-wrapper'>
                {mobileRecentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
              </div>
            )}

          </>
        ) : (
          <>
            {/* PC WIDTH */}

            {/* TRENDING SECTION */}
            <div className="collapse-div" onClick={trendingSwitch}>
              <h1 className='section-title' >Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="separation-line" />
            {trendingCollapse ? (
              <>
                <div className="wrapper">
                  {trendingOverView.filter((x) => searchFilter(x))
                    .map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                  {trending.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}
                </div>
              </>) : (
              <div className='wrapper'>
                {trendingOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}

              </div>
            )}



            {/* TOP VOTED SECTION */}
            <div className="collapse-div" onClick={topVotedSwitch} >
              <h1 className='section-title' >Top Voted</h1>
              <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="separation-line" />
            {topVotedCollapse ? (
              <>
                <div className="wrapper">
                  {topVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                  {topVoted.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                </div>

              </>) : (
              <div className='wrapper'>
                {topVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
              </div>
            )}




            {/* NEWEST MOVIES SECTION */}
            <div className="collapse-div" onClick={recentSwitch}>
              <h1 className='section-title' >Newest</h1>
              <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
            </div>
            <div className="separation-line" />
            {recentCollapse ? (
              <>
                <div className="wrapper">
                  {recentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />) })}
                  {recent.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
                </div>
              </>) : (
              <div className='wrapper'>
                {recentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />) })}
              </div>
            )}
            <div style={{ marginTop: '100px' }}>
              <Footer /></div>
          </>
        )}</div>
    </>
  );
}

export default App;
