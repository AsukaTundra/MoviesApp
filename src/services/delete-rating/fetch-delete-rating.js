import PropTypes from 'prop-types';

async function DeleteRating(sessionId, filmId) {
  if (sessionId) {
    const url = `https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=ac9f5a2225820c509d5d3cd533371ddb&guest_session_id=${sessionId}`;

    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    };

    const deleteRatingResult = fetch(url, options).then((response) => response.json());
    return deleteRatingResult;
  }
  return null;
}

export default DeleteRating;

DeleteRating.propTypes = {
  sessionId: PropTypes.number.isRequired,
  filmId: PropTypes.number.isRequired,
};
