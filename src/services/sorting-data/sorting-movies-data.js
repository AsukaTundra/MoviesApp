function antiBigDiscription(discription, urlPoster) {
  if (discription) {
    const maxWords = urlPoster ? 100 : 300;
    if (discription.length > maxWords) {
      const dotX3 = '...';
      return discription.substring(0, discription.indexOf(' ', maxWords)) + dotX3;
    }
    return discription;
  }
  return discription;
}

function SortMoviesData(unSortedData) {
  const sortedData = [];
  try {
    unSortedData.results.forEach((data) => {
      const { id, title, rating, genre_ids: genres, poster_path: poster, release_date: releaseDate } = data;
      let { overview, vote_average: voteAverage } = data;
      overview = antiBigDiscription(overview, poster);
      voteAverage = voteAverage.toFixed(1);
      sortedData.push({ id, title, releaseDate, voteAverage, overview, poster, rating, genres });
    });
  } catch (error) {
    return error;
  }
  return sortedData;
}

export default SortMoviesData;
