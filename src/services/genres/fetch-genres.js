async function GetGenres() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const genresData = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=ac9f5a2225820c509d5d3cd533371ddb&language=en',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.genres) {
        return response.genres;
      }
      return [];
    })
    .catch(() => {
      return [];
    });
  return genresData;
}

export default GetGenres;
