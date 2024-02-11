import PropTypes from 'prop-types';

async function AddRating(sessionId, filmId, ratingValue) {
  if (sessionId) {
    const url = `https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=ac9f5a2225820c509d5d3cd533371ddb&guest_session_id=${sessionId}`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${ratingValue}}`,
    };

    const addRatingResult = await fetch(url, options)
      .then((response) => response.json())
      .then((response) => response.status_message);
    return addRatingResult;
  }
  return null;
}

export default AddRating;

AddRating.propTypes = {
  sessionId: PropTypes.number.isRequired,
  filmId: PropTypes.number.isRequired,
  ratingValue: PropTypes.number.isRequired,
};
