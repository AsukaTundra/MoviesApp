import { format } from 'date-fns';

import FetchFilms from '../fetch-films';

function sortDataFilms() {
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

  function antiBigDiscription(discription) {
    if (discription) {
      const oldDiscription = discription.split('');
      const newDiscription = [];
      let inx = 0;
      while (inx < 150 || oldDiscription[inx] === ' ') {
        newDiscription.push(oldDiscription[inx]);
        inx += 1;
      }
      newDiscription.push('...');
      return newDiscription.join('');
    }
    return discription;
  }

  const sortedData = FetchFilms()
    .then((response) => {
      // сортировка полученного
      const result = [];
      response.results.forEach((data) => {
        const { title, vote_average: voteAverage } = data;
        let { release_date: releaseDate, overview, poster_path: poster } = data;

        releaseDate = ifNotReleaseDate(releaseDate);
        poster = ifNotPoster(poster);
        overview = antiBigDiscription(overview);
        result.push({ title, releaseDate, voteAverage, overview, poster });
      });
      return result;
    })
    .catch((err) => err);
  return sortedData;
}

export default sortDataFilms;
