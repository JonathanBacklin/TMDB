import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import '../css/specific.css'
import YouTube from 'react-youtube';
import Review from './Review';

const ClickedShell = props => {
  const { mediaType } = props;
  const { id } = useParams()
  const [movies, setMovies] = useState([])
  const [tvSeries, setTvSeries] = useState([])
  const [trailer, setTrailer] = useState([])
  // const [seriesTrailer,setSeriesTrailer] = useState([])
  const [actors, setActors] = useState([])
  const [genres, setGenres] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(() => {
    const MovieInformation = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&append_to_response=videos`);
      const resJson = await response.json();
      console.log(resJson)
      setMovies(resJson)
      setGenres(resJson.genres)
      setTrailer(resJson.videos)
    };
    MovieInformation();
  }, []);
  // useEffect(() => {
  //   const SeriesInformation = async () => {
  //     const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&append_to_response=videos`);
  //     const resJson = await response.json();
  //     setTvSeries(resJson)
  //   };
  //   SeriesInformation();
  // }, []);
  useEffect(() => {
    const Cast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`);
      const resJson = await response.json();
      setActors(resJson.cast.slice(0, 6))
    };
    Cast();
  }, []);

  useEffect(() => {
    const Cast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`);
      const resJson = await response.json();
      setReviews(resJson.results)
    };
    Cast();
  }, []);

  useEffect(() => {
    //    console.log(movies)
    // console.log(tvSeries)
    // console.log(trailer)
    // console.log(reviews)
    // console.log(actors)
  }, [movies, trailer, actors, reviews, tvSeries])




  const render = () => {
    const movieTrailer = trailer.results.find(x => x.type === "Trailer" || x.type === "Official" || x.name === "Official Trailer" || x.name === "Main Trailer" || x.name === "Trailer")
    // const seriesTrailer = tvSeries.results.find(x => x.name === "Official Trailer" || x.name === "Main Trailer" || x.name === "Trailer")
    return (
      <YouTube
        videoId={movieTrailer.key}
        containerClassName={"youtube-container"}
        opts={{
          width: '100%',
          height: '100%'
        }}
      />
    )
  }



  return (
    <>
      <Navbar />
      <div className='specific-movie-section'>
        <div className='specific-header-section'>
          {trailer.results ? render() : null}
        </div>
        <h1 style={{ textAlign: 'center', fontSize: '64px' }}>{movies.original_title} - {movies.release_date ? movies.release_date.slice(0, 4) : null}</h1>
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
            {actors.map(x => { return (<div key={x.id}><img src={`http://image.tmdb.org/t/p/w200/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>) })}
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