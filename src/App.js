import { useEffect, useState } from 'react';
import { FaArrowDown , FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import MovieShell from './MovieShell';


function App() {
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
  const [trendingToggled,setTrendingToggled] = useState(false)
  const [topVotedToggled,setTopvotedToggle] = useState(false)
  const [recentToggled,setRecentToggled] = useState(false)
  useEffect(() => {
    const Trending = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`
      );
      const resJson = await response.json();
      setTrending(resJson.results.slice(5));
      setTrendingOverView(resJson.results.slice(0,5))
    };
    Trending();
  }, []);
  useEffect(() => {
    console.log(trendingOverView)
    console.log(trending)
  },[trendingOverView])
  useEffect(() => {
    const TopRated = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`
      );
      const resJson = await response.json();
      setTopVoted(resJson.results.slice(5));
      setTopVotedOverView(resJson.results.slice(0,5))
    };
    TopRated();
  }, []);
  useEffect(() => {
    const Recent = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`
      );
      const resJson = await response.json();
      setRecent(resJson.results.slice(5));
      setRecentOverView(resJson.results.slice(0,5))
    };
    Recent();
  }, []);
  useEffect(() => {
    const Genres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`
      );
      const resJson = await response.json();
      setGenre(resJson.results);
    };
    Genres();
  }, []);

  const searchFilter = x => { 
    let moviename = x.original_title
    let seriesname = x.name
    if(moviename){
      if( moviename.toLowerCase().includes(search.toLowerCase()))
      {console.log(moviename)
        return x}}
      if(seriesname) {
          if( seriesname.toLowerCase().includes(search.toLowerCase()))
          {
         {
           return x}
      }}
      else if(moviename && seriesname == "")
      {return x}
    }
    
  
// search bar fix
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
       <div className="navbar-container">
        <div className="navbar-content">
          <div>
              <Link to="/" style={{textDecoration:'none',color:'white'}}><h1 >Movies</h1></Link>
          </div>
          <div className='navbar-links'>
              <Link to="/" style={{color:'white',fontSize:'24px'}}>Home</Link>
              <Link to="/Discover" style={{color:'white',fontSize:'24px',textDecoration:'none'}}>Discover</Link>
          </div>
          <div className="search-bar-div">
            <input type="text"  className='search-bar' onChange={handleChange} placeholder="Search..."/>
            <FaSearch id='search-icon'/>
            </div>
            
        </div>
      </div> 
    <div className="App">
      <div className="App-container">
        <div className="collapse-div" onClick={trendingSwitch}>
      <h1 className='Movies-h1' >Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
      </div>
      <div className="separation-line" />
      {trendingCollapse ? (
        <>
      <div className="wrapper">
    {trendingOverView.filter((x) => searchFilter(x))
       .map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
      {trending.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
          </div>
          </> ) : (
            <div className='wrapper'>
            {trendingOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
            </div>
           )}
           {/* TOP VOTED SECTION */}
           <div className="collapse-div">
        <h1 className='Movies-h1' onClick={topVotedSwitch}>Top Voted</h1>
        <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"}/>
        </div>
        <div className="separation-line" />
        {topVotedCollapse ? (
        <>
      <div className="wrapper">
    {topVotedOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
      {topVoted.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
          </div>
        
          </> ) : (
            <div className='wrapper'>
            {topVotedOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
            </div>
           )}

           {/* NEWEST MOVIES SECTION */}
           <div className="collapse-div">
        <h1 className='Movies-h1' onClick={recentSwitch}>Newest</h1>
        <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
        </div>
        <div className="separation-line" />
        {recentCollapse ? (
        <>
      <div className="wrapper">
    {recentOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
      {recent.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
          </div>
        
          </> ) : (
            <div className='wrapper'>
            {recentOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell id={x.id} poster={x.poster_path} title={x.original_title} name={x.name} overview={x.overview} genre={x.genre_ids} releaseDate={x.release_date} airDate={x.first_air_date}/>)})}
            </div>
           )}
           
            </div>
    </div><div style={{marginTop:'100px'}}>
    <Footer/>

    </div>
  </>
  );
}

export default App;
