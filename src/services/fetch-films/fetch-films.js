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
    .catch((error) => error);
  return filmsArray;
}

export default FetchFilms;
