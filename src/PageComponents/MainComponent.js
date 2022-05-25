import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import MovieShell from '../ReusableComponents/MovieShell';

export const MainComponent = (trendingSwitch, trendingToggled, trendingCollapse, trendingOverView,
  searchFilter, trending, topVotedSwitch, topVotedToggled, topVotedCollapse, topVotedOverView, topVoted,
  recentSwitch, recentToggled, recentCollapse, recentOverView, recent) => {
  return <>
    {/* PC WIDTH */}

    {/* TRENDING SECTION */}
    <div className="collapse-div" onClick={trendingSwitch}>
      <h1 className='section-title'>Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
    </div>
    <div className="separation-line" />
    {trendingCollapse ? (
      <>
        <div className="wrapper">
          {trendingOverView.filter((x) => searchFilter(x))
            .map(x => { return (<MovieShell key={x.id} {...x} />); })}
          {trending.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
        </div>
      </>) : (
      <div className='wrapper'>
        {trendingOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}

      </div>
    )}

    {/* TOP VOTED SECTION */}
    <div className="collapse-div" onClick={topVotedSwitch}>
      <h1 className='section-title'>Top Voted</h1>
      <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"} />
    </div>
    <div className="separation-line" />
    {topVotedCollapse ? (
      <>
        <div className="wrapper">
          {topVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
          {topVoted.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
        </div>

      </>) : (
      <div className='wrapper'>
        {topVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
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
        <div className="wrapper">
          {recentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
          {recent.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
        </div>
      </>) : (
      <div className='wrapper'>
        {recentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} {...x} />); })}
      </div>
    )}
    <div style={{ marginTop: '100px' }}>
    </div>
  </>;
}
