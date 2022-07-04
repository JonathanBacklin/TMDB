import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/mobile.css';
import Navbar from '../Components/Navbar'
import { SearchFunction } from '../Utilities/SearchFunction';
import { UseResizeWindowFunction } from '../Utilities/UseResizeWindowFunction';
import { FaArrowDown } from 'react-icons/fa';
import MovieShell from '../Components/MovieShell';
import { RecentFetch, TopRatedFetch, TrendingFetch } from '../Utilities/API';

const App = () => {
  //GENERAL DECLARATIONS
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;

  //PC MOVIE DECLARATIONS
  const [trendingData, setTrendingData] = useState([])
  const [topVotedData, setTopVotedData] = useState([])
  const [recentData, setRecentData] = useState([])
  const [search, setSearch] = useState('')
  const [trendingCollapse, setTrendingCollapse] = useState(false)
  const [topVotedCollapse, setTopVotedCollapse] = useState(false)
  const [recentCollapse, setRecentCollapse] = useState(false)
  const [trendingToggled, setTrendingToggled] = useState(false)
  const [topVotedToggled, setTopvotedToggle] = useState(false)
  const [recentToggled, setRecentToggled] = useState(false)




  const searchFilter = SearchFunction(search)

  UseResizeWindowFunction(setWidth);

  // API REQUESTS
  const Trending = TrendingFetch(setTrendingData);
  const TopRated = TopRatedFetch(setTopVotedData);
  const Recent = RecentFetch(setRecentData);

  useEffect(() => {
    Trending()
    Recent()
    TopRated()
  }, []);

  const trendingSwitch = () => {
    setTrendingCollapse(prev => !prev)
    setTrendingToggled(prev => !prev)

  }
  const topVotedSwitch = () => {
    setTopvotedToggle(prev => !prev)
    setTopVotedCollapse(prev => !prev)
  }
  const recentSwitch = () => {
    setRecentToggled(prev => !prev)
    setRecentCollapse(prev => !prev)
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
        <div className="collapse-div" onClick={trendingSwitch}>
          <h1 className='section-title'>Trending</h1>
          <FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
        </div>
        <div className="separation-line" />
        {trendingCollapse ? (
          <>
            <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
              {width > breakpoint ?
                trendingData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                trendingData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              }
              {width > breakpoint ?
                trendingData.slice(5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                trendingData.slice(3, 9).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              }
            </div>

          </>) : (
          <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
            {width > breakpoint ?
              trendingData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              :
              trendingData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
            }
          </div>
        )}
        {/* vanlig overview -> mobile overview -> normal view -> mobil vanlig view -> vanlig overview -> mobil overview */}
        {/* TOP VOTED SECTION */}
        <div className="collapse-div" onClick={topVotedSwitch}>
          <h1 className='section-title'>Top Voted</h1>
          <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"} />
        </div>
        <div className="separation-line" />
        {topVotedCollapse ? (
          <>
            <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
              {width > breakpoint ?
                topVotedData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                topVotedData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              }
              {width > breakpoint ?
                topVotedData.slice(5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                topVotedData.slice(3, 9).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              }
            </div>

          </>) : (
          <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
            {width > breakpoint ?
              topVotedData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              :
              topVotedData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
            }
          </div>
        )}

        {/* NEWEST MOVIES SECTION */}
        <div className="collapse-div" onClick={recentSwitch}>
          <h1 className='section-title'>Newest</h1>
          <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
        </div>
        <div className="separation-line" />
        {recentCollapse ? (
          <>
            <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
              {width > breakpoint ?
                recentData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                recentData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />) })
              }
              {width > breakpoint ?
                recentData.slice(5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
                :
                recentData.slice(3, 9).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              }
            </div>
          </>) : (
          <div className={width > breakpoint ? `wrapper` : `mobile-wrapper`}>
            {width > breakpoint ?
              recentData.slice(0, 5).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
              :
              recentData.slice(0, 3).filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })
            }
          </div>
        )}
      </div>
    </>
  );
}

export default App;






