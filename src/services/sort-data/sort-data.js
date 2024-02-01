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

function antiBigDiscription(discription, urlPoster) {
  if (discription) {
    const maxWords = urlPoster ? 120 : 300;
    if (discription.length > maxWords) {
      const dotX3 = '...';
      return discription.substring(0, discription.indexOf(' ', maxWords)) + dotX3;
    }
    return discription;
  }
  return discription;
}

function SortData(unSortedData) {
  const sortedData = [];
  try {
    unSortedData.results.forEach((data) => {
      const { title } = data;
      let { release_date: releaseDate, overview, poster_path: poster, vote_average: voteAverage } = data;
      releaseDate = ifNotReleaseDate(releaseDate);
      poster = ifNotPoster(poster);
      overview = antiBigDiscription(overview, poster);
      voteAverage = voteAverage.toFixed(1);
      sortedData.push({ title, releaseDate, voteAverage, overview, poster });
    });
  } catch (error) {
    return error;
  }
  return sortedData;
}

export default SortData;
