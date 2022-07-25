import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { FaArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../css/specific.css'
import YouTube from 'react-youtube';
import Review from '../Components/Review';
import { UseResizeWindowFunction } from '../Utilities/UseResizeWindowFunction';
import { CastFetch, ReviewsFetch, SeparateMovieFetch } from '../Utilities/API';




const ClickedMovie = x => {
  //DECLARATIONS
  const { mediaType } = x;
  const { id } = useParams()
  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState([])
  const [actors, setActors] = useState([])
  const [actorsCollapse, setActorsCollapse] = useState(false)
  const [actorsToggled, setActorsToggled] = useState(false)
  const [genres, setGenres] = useState([])
  const [reviews, setReviews] = useState([])
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;
  let imgSize = width > breakpoint ? 'w200' : 'w154'

  UseResizeWindowFunction(setWidth);



  // Fetching Api Requests
  let MovieInformation = SeparateMovieFetch(mediaType, id, setMovies, setGenres, setTrailer);
  let Cast = CastFetch(mediaType, id, setActors);
  let Reviews = ReviewsFetch(mediaType, id, setReviews);

  useEffect(() => {
    Cast();
    MovieInformation();
    Reviews();
  }, []);


  const ActorsSwitch = () => {
    setActorsToggled(prev => !prev)
    setActorsCollapse(prev => !prev)
  }

  const render = () => {
    const movieTrailer = trailer.results.find(x =>
      x.name === "Official Trailer" ||
      x.type === "Official" ||
      x.name === "Main Trailer" ||
      x.type === "Trailer" ||
      x.name === "Trailer" || x.name[0])

    return (
      <YouTube
        videoId={movieTrailer.key}
        containerClassName={"youtube-container"}
        opts={{
          width: '100%',
          height: '100%'
        }}
      />)
  }




  return (
    <>
      <Navbar />
      <div className='specific-movie-section'>
        <div className={`${width > breakpoint ? 'specific-header-section' : 'mobile-specific-header-section'}`} >
          {trailer.results ? render() : null}
        </div>
        {width > breakpoint ?
          <h1 style={{ textAlign: 'center', fontSize: '64px' }}> {movies.original_title ? movies.original_title : movies.original_name} - {movies.release_date ? movies.release_date.slice(0, 4) : movies.first_air_date}</h1>
          :
          <h3 style={{ textAlign: 'center', fontSize: '32px' }}> {movies.original_title ? movies.original_title : movies.original_name} - {movies.release_date ? movies.release_date.slice(0, 4) : movies.first_air_date}</h3>

        }
        <div className='specific-description-container'>
          {width > breakpoint ?
            <div className='specific-description-header'>
              <h1>Description</h1>
              <h1>Rating: {movies.vote_average}</h1>
            </div>
            :
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h1 style={{ textAlign: 'center' }}>Rating: {movies.vote_average}</h1>
              <h1 style={{ textAlign: 'center' }}>Description</h1>
            </div>
          }

          <div className='specific-separation-line' />
          <h3>{movies.overview}</h3>
          <h5 style={{ display: 'flex', flexWrap: 'wrap' }}>{genres.map(x => { return (<div className='specific-genre' key={x.id} style={{ margin: '5px' }}>{x.name}</div>) })}</h5>
        </div>
        <div className='specific-actors-container' >
          <div className="collapse-div" onClick={ActorsSwitch}>
            <h1>Actors</h1>
            <FaArrowDown className={actorsToggled ? "ArrowToggled" : "ArrowNotToggled"} />
          </div>
          <div className='specific-separation-line' />
          <div className="actors">
            {actorsCollapse ? (<>
              {actors.slice(0, 6).map(x => { return (<div key={x.id}><img src={x.profile_path !== null ? `http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}` : null} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
              {actors.slice(6, 14).map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
            </>
            ) : (
              <>
                {actors.slice(0, 6).map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
              </>
            )
            }
          </div>
        </div>

        <div className='specific-reviews-container'>
          <h1>Reviews({reviews.length})</h1>
          <div className='specific-separation-line' />
          {reviews.map(x => {
            return (
              <Review {...x} />
            )
          })}
        </div>
      </div>
    </>

  )
}

export default ClickedMovie








