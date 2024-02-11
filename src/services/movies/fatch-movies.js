import PropTypes from 'prop-types';

import SortData from '../sorting-data/sorting-movies-data';

async function Movies(search, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const filmsArray = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ac9f5a2225820c509d5d3cd533371ddb&query=${search}&include_adult=false&language=en-US&page=${page}`,
    options
  ).then((response) => response.json());
  return SortData(filmsArray);
}

export default Movies;

Movies.propTypes = {
  search: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
