async function GuestSession() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const sessionId = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ac9f5a2225820c509d5d3cd533371ddb',
    options
  )
    .then((response) => response.json())
    .then((response) => response.guest_session_id);
  return sessionId;
}

export default GuestSession;
