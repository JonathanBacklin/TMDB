const BASEURL = `https://api.themoviedb.org/3/`
const APIKEY = `f78a7122e289d7d5eff2ba85c984f4ba`



// APP.JS FETCHES
export const TrendingFetch = (setTrendingData) => {
  return async () => {
    const response = await fetch(`${BASEURL}trending/all/day?api_key=${APIKEY}&language=en-US&page=1`);
    const resJson = await response.json();
    setTrendingData(resJson.results);
  };
}
export const TopRatedFetch = (setRecentData) => {
  return async () => {
    const response = await fetch(`${BASEURL}movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`);
    const resJson = await response.json();
    setRecentData(resJson.results);
  };
}

export const RecentFetch = (setTopVotedData) => {
  return async () => {
    const response = await fetch(`${BASEURL}movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`);
    const resJson = await response.json();
    setTopVotedData(resJson.results);
  };
}

// DISCOVER.JS FETCHES
export const DiscoverFetch = (BASEURL, APIKEY, filterGenre, page, fromReleaseYear, toReleaseYear, minRating, maxRating, setDiscoverMovies) => {
  return async () => {
    const response = await fetch(`${BASEURL}/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&with_genres=${filterGenre}&include_adult=false&include_video=false&page=${page}&release_date.gte=${fromReleaseYear}&release_date.lte=${toReleaseYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`);
    const resJson = await response.json();
    setDiscoverMovies(resJson.results);
  };
}
export const GenresFetch = (setGenre) => {
  return async () => {
    const response = await fetch(`${BASEURL}/genre/movie/list?api_key=${APIKEY}&language=en-US`);
    const resJson = await response.json();
    setGenre(resJson.genres);
  };
}


// Clicked Movie.JS Fetches

export const SeparateMovieFetch = (mediaType, id, setMovies, setGenres, setTrailer) => {
  return async () => {
    let response = await fetch(`${BASEURL}${mediaType}/${id}?api_key=${APIKEY}&language=en-US&append_to_response=videos`);
    let resJson = await response.json();
    setMovies(resJson);
    setGenres(resJson.genres);
    setTrailer(resJson.videos);
  };
}


export const ReviewsFetch = (mediaType, id, setReviews) => {
  return async () => {
    let response = await fetch(`${BASEURL}${mediaType}/${id}/reviews?api_key=${APIKEY}&language=en-US&page=1`);
    let resJson = await response.json();
    setReviews(resJson.results);
  };
}
export const CastFetch = (mediaType, id, setActors) => {
  return async () => {
    let response = await fetch(`${BASEURL}${mediaType}/${id}/credits?api_key=${APIKEY}&language=en-US`);
    let resJson = await response.json();
    setActors(resJson.cast);
  };
}





// export const DiscoverFetch = (filterGenre, page, fromReleaseYear, toReleaseYear, minRating, maxRating, setDiscoverMovies) => {
//   return async () => {
//     const response = await fetch(
//       `${BASEURL}/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&with_genres=${filterGenre}&include_adult=false&include_video=false&page=${page}&release_date.gte=${fromReleaseYear}&release_date.lte=${toReleaseYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`);
//     const resJson = await response.json();
//     setDiscoverMovies(resJson.results);
//   };
// }