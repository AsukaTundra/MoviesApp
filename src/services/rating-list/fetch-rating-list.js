import PropTypes from 'prop-types';

import SortData from '../sorting-data/sorting-movies-data';

async function RatingList(sessionId, page) {
  if (sessionId) {
    const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=ac9f5a2225820c509d5d3cd533371ddb&language=en-US&page=${page}&sort_by=created_at.asc`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    const Rating = await fetch(url, options).then((response) => response.json());
    return SortData(Rating);
  }
  return [];
}

export default RatingList;

RatingList.propTypes = {
  sessionId: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
