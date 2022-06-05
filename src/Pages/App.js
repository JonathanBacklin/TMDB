import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/mobile.css';
import Navbar from '../ReusableComponents/Navbar'
import { SearchFunction } from '../Utilities/SearchFunction';
import { MobileMainComponent } from '../PageComponents/MobileMainComponent';
import { MainComponent } from '../PageComponents/MainComponent';
import { ResizeWindowFunction } from '../Utilities/ResizeWindowFunction';

const App = () => {
  //GENERAL DECLARATIONS
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;


  //

  //PC MOVIE DECLARATIONS
  const [trending, setTrending] = useState([])
  const [trendingOverView, setTrendingOverView] = useState([])
  const [topVoted, setTopVoted] = useState([])
  const [topVotedOverView, setTopVotedOverView] = useState([])
  const [recent, setRecent] = useState([])
  const [recentOverView, setRecentOverView] = useState([])
  const [search, setSearch] = useState('')
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


  // API URLS
  const BASEURL = 'https://api.themoviedb.org/3'
  const APIKEY = 'f78a7122e289d7d5eff2ba85c984f4ba'
  const trendingFetch = `${BASEURL}/trending/all/day?api_key=${APIKEY}&language=en-US&page=1`
  const topRatedFetch = `${BASEURL}/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`
  const recentFetch = `${BASEURL}/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
  const searchFilter = SearchFunction(search)

  ResizeWindowFunction(setWidth);


  // API REQUESTS
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
          MobileMainComponent(
            trendingSwitch,
            trendingToggled,
            trendingCollapse,
            mobileTrendingOverView,
            searchFilter,
            mobileTrending,
            topVotedSwitch,
            topVotedToggled,
            topVotedCollapse,
            mobileTopVotedOverView,
            mobileTopVoted,
            recentSwitch,
            recentToggled,
            recentCollapse,
            mobileRecentOverView,
            mobileRecent)
        ) : (
          MainComponent(trendingSwitch,
            trendingToggled,
            trendingCollapse,
            trendingOverView,
            searchFilter,
            trending,
            topVotedSwitch,
            topVotedToggled,
            topVotedCollapse,
            topVotedOverView,
            topVoted, recentSwitch,
            recentToggled,
            recentCollapse,
            recentOverView,
            recent)
        )}
      </div>
    </>
  );
}

export default App;


