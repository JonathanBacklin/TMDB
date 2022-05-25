import React, { useEffect, useState } from 'react'
import Navbar from '../ReusableComponents/Navbar'
import { FaArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../css/specific.css'
import YouTube from 'react-youtube';
import Review from '../ReusableComponents/Review';
import { ResizeWindowFunction } from '../Utilities/ResizeWindowFunction';




const ClickedShell = x => {
  //DECLARATIONS
  const { mediaType } = x;
  const { id } = useParams()
  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState([])
  const [actors, setActors] = useState([])
  const [actorsOverview, setActorsOverview] = useState([])
  const [actorsCollapse, setActorsCollapse] = useState(false)
  const [actorsToggled, setActorsToggled] = useState(false)
  const [genres, setGenres] = useState([])
  const [reviews, setReviews] = useState([])
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;


  useEffect(() => {
    console.log(id)
  }, [id])

  ResizeWindowFunction(setWidth);

  useEffect(() => {
    let MovieInformation = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&append_to_response=videos`);
      let resJson = await response.json();
      setMovies(resJson)
      setGenres(resJson.genres)
      setTrailer(resJson.videos)
    };
    MovieInformation();
  }, []);

  useEffect(() => {
    let Cast = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`);
      let resJson = await response.json();
      setActorsOverview(resJson.cast.slice(0, 6))
      setActors(resJson.cast.slice(6, 14))
    };
    Cast();
  }, []);

  const ActorsSwitch = () => {
    actorsToggled ? setActorsToggled(false) : setActorsToggled(true)
    setActorsCollapse(!actorsCollapse)
  }


  useEffect(() => {
    let Reviews = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`);
      let resJson = await response.json();
      setReviews(resJson.results)
    };
    Reviews();
  }, []);

  let imgSize = width > breakpoint ? 'w200' : 'w185'

  useEffect(() => {
    console.log(trailer.results)
  }, [trailer])

  const render = () => {
    const movieTrailer = trailer.results.find(x =>
      x.name === "Official Trailer" ||
      x.type === "Official" ||
      x.name === "Main Trailer" ||
      x.type === "Trailer" ||
      x.name === "Trailer")

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
        <div className='specific-header-section'>
          {trailer.results ? render() : null}
        </div>
        <h1 style={{ textAlign: 'center', fontSize: '64px' }}> {movies.original_title} - {movies.release_date ? movies.release_date.slice(0, 4) : null}</h1>
        <div className='specific-description-container'>
          <div className='specific-description-header'>
            <h1>Description</h1>
            <h1>Rating: {movies.vote_average}</h1>
          </div>
          <div className='specific-separation-line'></div>
          <h3>{movies.overview}</h3>
          <h5 style={{ display: 'flex' }}>{genres.map(x => { return (<div className='specific-genre' key={x.id}>{x.name}</div>) })}</h5>
        </div>
        <div className='specific-actors-container' >
          <div className="collapse-div" onClick={ActorsSwitch}>
            <h1>Actors</h1>
            <FaArrowDown className={actorsToggled ? "ArrowToggled" : "ArrowNotToggled"} />
          </div>
          <div className='specific-separation-line'></div>
          <div className="actors">
            {actorsCollapse ? (<>
              {actorsOverview.map(x => { return (<div key={x.id}><img src={x.profile_path !== null ? `http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}` : null} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
              {actors.map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
            </>
            ) : (
              <>
                {actorsOverview.map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
              </>
            )
            }
          </div>
        </div>

        <div className='specific-reviews-container'>
          <h1>Reviews({reviews.length})</h1>
          <div className='specific-separation-line'></div>
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

export default ClickedShell


