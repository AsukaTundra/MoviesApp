async function AddRating(sessionId, filmId) {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  const deleteRatingResult = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=ac9f5a2225820c509d5d3cd533371ddb&guest_session_id=${sessionId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.status_message);
  return deleteRatingResult;
}

export default AddRating;
