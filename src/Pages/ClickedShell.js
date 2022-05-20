import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom';
import '../css/specific.css'
import YouTube from 'react-youtube';
import Review from '../Components/Review';
import { ResizeWindowFunction } from '../Utilities/ResizeWindowFunction';




const ClickedShell = x => {
  //DECLARATIONS
  const { mediaType } = x;
  const { id } = useParams()
  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState([])
  const [actors, setActors] = useState([])
  const [genres, setGenres] = useState([])
  const [reviews, setReviews] = useState([])
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1000;


  ResizeWindowFunction(setWidth);

  useEffect(() => {
    let MovieInformation = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&append_to_response=videos`);
      let resJson = await response.json();
      console.log(resJson)
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
      setActors(resJson.cast.slice(0, 6))
    };
    Cast();
  }, []);

  useEffect(() => {
    let Reviews = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`);
      let resJson = await response.json();
      setReviews(resJson.results)
    };
    Reviews();
  }, []);


  const render = () => {
    const movieTrailer = trailer.results.find(x => x.type === "Trailer" ||
      x.type === "Official" ||
      x.name === "Official Trailer" ||
      x.name === "Main Trailer" ||
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

  let imgSize = width > breakpoint ? 'w200' : 'w154'



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


        <div className='specific-actors-container'>
          <h1>Actors</h1>
          <div className='specific-separation-line'></div>
          <div className="actors">
            {actors.map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/${imgSize}/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
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


