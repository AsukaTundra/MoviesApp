import './item.css';
import { format } from 'date-fns';

function Item({ title, releaseDate, voteAverage, overview, poster }) {
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

  function antiBigDiscription(asd) {
    if (asd) {
      const aboba = asd.split('');
      const bebra = [];
      let inx = 0;
      while (inx < 150 || aboba[inx] === ' ') {
        bebra.push(aboba[inx]);
        inx += 1;
      }
      bebra.push('...');
      return bebra.join('');
    }
    return asd;
  }

  return (
    <div className="item">
      {ifNotPoster(poster)}
      <div className="description">
        <h2 className="title">{title}</h2>
        {ifNotReleaseDate(releaseDate)}
        <div className="genres">
          <div className="genre">Action</div>
          <div className="genre">Drama</div>
        </div>
        <p className="voteAverage">{voteAverage}</p>
        <p className="overview">{antiBigDiscription(overview)}</p>
      </div>
    </div>
  );
}

export default Item;
