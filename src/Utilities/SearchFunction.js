export const SearchFunction = search => {
  return x => {
    let moviename = x.original_title, seriesname = x.name;
    if (moviename) {
      if (moviename.toLowerCase().includes(search.toLowerCase())) {
        return x;
      }
    }
    if (seriesname) {
      if (seriesname.toLowerCase().includes(search.toLowerCase())) {
        return x;
      }
    }
    else if (moviename && seriesname === "") { return x; }
  };
}
