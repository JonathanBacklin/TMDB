import { useEffect, useState } from 'react';
import { FaArrowDown} from 'react-icons/fa';
import './App.css';
import Footer from './Footer';
import MovieShell from './MovieShell';
import Navbar from './Navbar';



// Alla api requests
const apiKey = 'f78a7122e289d7d5eff2ba85c984f4ba'
const baseUrl = 'https://api.themoviedb.org/3'
const trendingFetch = `${baseUrl}/trending/all/day?api_key=${apiKey}&language=en-US&page=1`
const topRatedFetch = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
const recentFetch = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
const genresFetch = `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`


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
      const response = await fetch(trendingFetch);
      const resJson = await response.json();
      setTrending(resJson.results.slice(5));
      setTrendingOverView(resJson.results.slice(0,5))
    };
    Trending()
    ;}, []);
  useEffect(() => {
    const TopRated = async () => {
      const response = await fetch(topRatedFetch);
      const resJson = await response.json();
      setTopVoted(resJson.results.slice(5));
      setTopVotedOverView(resJson.results.slice(0,5))
    };
    TopRated();
  }, []);
  useEffect(() => {
    const Recent = async () => {
      const response = await fetch(recentFetch);
      const resJson = await response.json();
      setRecent(resJson.results.slice(5));
      setRecentOverView(resJson.results.slice(0,5))
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
    //  console.log(x.genre_ids)
    let test = genre.map((x) => x.id && x.name)
    // console.log(test)
    // console.log(genre.map((x) => x.id))
    if(test.includes(x.genre_ids)){
      return test.name
    }

  }
   

    //onclick funktion så när du klickar på en film tas du till en annan komponent som tar in all info

  const searchFilter = x => {
    let moviename = x.original_title,seriesname = x.name
    if(moviename){
      if( moviename.toLowerCase().includes(search.toLowerCase())){
        return x}}
      if(seriesname) {
          if( seriesname.toLowerCase().includes(search.toLowerCase()))
          {
         
           return x}
    }
      else if(moviename && seriesname === "")
      {return x}
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
    <div className="App">
      
      {/* TRENDING SECTION */}
      <div className="App-container">
        <div className="collapse-div" onClick={trendingSwitch}>
      <h1 className='Movies-h1' >Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
      </div>
      <div className="separation-line" />
      {trendingCollapse ? (
        <>
      <div className="wrapper">
    {trendingOverView.filter((x) => searchFilter(x))
       .map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />)})}
      {trending.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />)})}
          </div>
          </> ) : (
            <div className='wrapper'>
            {trendingOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}   {...x} />)})}
            
            </div>
           )}



           {/* TOP VOTED SECTION */}
           <div className="collapse-div" onClick={topVotedSwitch} >
        <h1 className='Movies-h1' >Top Voted</h1>
        <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"}/>
        </div>
        <div className="separation-line" />
        {topVotedCollapse ? (
        <>
      <div className="wrapper">
    {topVotedOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />)})}
      {topVoted.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />)})}
          </div>
        
          </> ) : (
            <div className='wrapper'>
            {topVotedOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x} />)})}
            </div>
           )}




           {/* NEWEST MOVIES SECTION */}
           <div className="collapse-div" onClick={recentSwitch}>
        <h1 className='Movies-h1' >Newest</h1>
        <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
        </div>
        <div className="separation-line" />
        {recentCollapse ? (
        <>
      <div className="wrapper">
    {recentOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}   {...x}/>)})}
      {recent.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x}/>)})}
          </div>
          </> ) : (
            <div className='wrapper'>
            {recentOverView.filter((x) => searchFilter(x)).map(x => {return(<MovieShell key={x.id} checkedID={checkedID(x)}  {...x}/>)})}
            </div>
           )}
            </div>
    </div>
    <div style={{marginTop:'100px'}}>
    <Footer/>
    </div>
  </>
  );
}

export default App;
