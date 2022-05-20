import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import MovieShell from './MovieShell';

export const MobileAppView = (trendingSwitch, trendingToggled, trendingCollapse, mobileTrendingOverView, searchFilter, checkedID, mobileTrending, topVotedSwitch, topVotedToggled, topVotedCollapse, mobileTopVotedOverView, mobileTopVoted, recentSwitch, recentToggled, recentCollapse, mobileRecentOverView, mobileRecent) => {
  return <>

    {/* MOBILE TRENDING SECTION */}
    <div className="collapse-div" onClick={trendingSwitch}>
      <h1 className='section-title'>Trending</h1><FaArrowDown className={trendingToggled ? "ArrowToggled" : "ArrowNotToggled"} />
    </div>
    <div className="mobile-separation-line" />

    {trendingCollapse ? (
      <>
        <div className="mobile-wrapper">
          {mobileTrendingOverView.filter((x) => searchFilter(x))
            .map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
          {mobileTrending.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
        </div>
      </>) : (
      <div className='mobile-wrapper'>
        {mobileTrendingOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
      </div>
    )}
    {/* MOBILE TOP VOTED SECTION */}
    <div className="collapse-div" onClick={topVotedSwitch}>
      <h1 className='section-title'>Top Voted</h1>
      <FaArrowDown className={topVotedToggled ? "ArrowToggled" : "ArrowNotToggled"} />
    </div>
    <div className="mobile-separation-line" />
    {topVotedCollapse ? (
      <>
        <div className="mobile-wrapper">
          {mobileTopVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
          {mobileTopVoted.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
        </div>

      </>) : (
      <div className='mobile-wrapper'>
        {mobileTopVotedOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
      </div>
    )}

    {/* MOBILE NEWEST MOVIES SECTION */}
    <div className="collapse-div" onClick={recentSwitch}>
      <h1 className='section-title'>Newest</h1>
      <FaArrowDown className={recentToggled ? "ArrowToggled" : "ArrowNotToggled"} />
    </div>
    <div className="mobile-separation-line" />
    {recentCollapse ? (
      <>
        <div className="mobile-wrapper">
          {mobileRecentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
          {mobileRecent.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
        </div>
      </>) : (
      <div className='mobile-wrapper'>
        {mobileRecentOverView.filter((x) => searchFilter(x)).map(x => { return (<MovieShell key={x.id} checkedID={checkedID(x)} {...x} />); })}
      </div>
    )}

  </>;
}
