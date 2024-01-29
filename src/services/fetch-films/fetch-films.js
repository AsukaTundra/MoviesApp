/* eslint-disable camelcase */
import { format } from 'date-fns';

function ifNotReleaseDate(date) {
  if (date) {
    return <p className="releaseDate">{format(new Date(Date.parse(date)), 'PP')}</p>;
  }
  return null;
}

function ifNotPoster(urlPoster) {
  if (urlPoster) {
    return <img src={`https://image.tmdb.org/t/p/w200/${urlPoster}`} alt="film poster" />;
  }
  return null;
}

function antiBigDiscription(asd) {
  if (asd) {
    const aboba = asd.split('');
    const bebra = [];
    let inx = 0;
    while (inx < 150 || aboba[inx] === ' ') {
      bebra.push(aboba[inx]);
      inx += 1;
    }
    bebra.push('...');
    return bebra.join('');
  }
  return asd;
}

async function FetchFilms() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzlmNWEyMjI1ODIwYzUwOWQ1ZDNjZDUzMzM3MWRkYiIsInN1YiI6IjY1YjM4N2MxZDIzNmU2MDE0OWJmZTJjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WqZEMdx9qY7KOwMj7svmCQMiWSwp6uCntAVKukU-SF8',
    },
  };

  const filmsArray = await fetch(
    'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
    options
  )
    .then((response) => {
      // проврека ошибки
      if (!response.ok) {
        throw new Error('Failed fetch');
      }
      return response.json();
    })
    .then((response) => {
      // сортировка полученного
      const result = [];
      response.results.forEach((data) => {
        const { title, vote_average } = data;
        let { release_date, overview, poster_path } = data;
        release_date = ifNotReleaseDate(release_date);
        poster_path = ifNotPoster(poster_path);
        overview = antiBigDiscription(overview);
        result.push({ title, release_date, vote_average, overview, poster_path });
      });
      return result;
    })
    .catch((error) => error);
  return filmsArray;
}

export default FetchFilms;
