import React,{useEffect,useState} from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import './specific.css'

const ClickedShell = () => {
  const [movies,setMovies] = useState([])
  const [trailer,setTrailer] = useState([])
  const [actors,setActors] = useState([])
  const [genres,setGenres] = useState([])
  const [reviews,setReviews] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const MovieInformation = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`);
      const resJson = await response.json();
      setMovies(resJson)
      setGenres(resJson.genres)
    };
    MovieInformation();
  }, []);
  useEffect(() => {
    const Cast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`);
      const resJson = await response.json();
      setActors(resJson.cast.slice(0,6))
    };
    Cast();
  }, []);
  useEffect(() => {
    const Cast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US`);
      const resJson = await response.json();
      setTrailer(resJson)
    };
    Cast();
  }, []);
  useEffect(() => {
    const Cast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f78a7122e289d7d5eff2ba85c984f4ba&language=en-US&page=1`);
      const resJson = await response.json();
      setReviews(resJson.results)
    };
    Cast();
  }, []);


  useEffect(() => {
  //    console.log(movies)
  //    console.log(trailer)
      console.log(reviews)
  // console.log(actors)
  },[movies,trailer,actors,reviews])

  https://www.figma.com/file/FDU4FhUDCl9uRN5nIFc2Sq/Test-case?node-id=0%3A1
      
  return (
    <>
    <Navbar/>
    <div className='specific-movie-section'>

  
  
      <h1>{movies.original_title}</h1>
      <h1>{movies.vote_average}</h1>
      <h3>{movies.overview}</h3>
      <h3 style={{display:'flex', justifyContent:'space-evenly'}}>{genres.map(x => {return(<div key={x.id}>{x.name}</div>)})}</h3>
      


      <div className="actors">
      {actors.map(x => {return(<div key={x.id}><img src={`http://image.tmdb.org/t/p/w200/${x.profile_path}`} alt="Actor/Actress" /><h3>{x.name}</h3> </div>)})}</div>


      <h1>Reviews({reviews.length})</h1>
      {reviews.map(x => {
        return(<div key={x.id}>
        <h1>{x.author}</h1>
        <h1>{x.created_at.slice(0,10)}</h1>
        <h4>{x.content}</h4>

        <h3>show more...</h3>
        </div>
        )
      })}



    </div>
    </>
    
  )
}

export default ClickedShell