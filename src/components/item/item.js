import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { format } from 'date-fns';

import './item.scss';

import { context } from '../../app/movies-app';

function calculationGenres(genres) {
  const genresList = useContext(context);
  let itemGenres = [];
  genres.forEach((element) => {
    genresList.forEach((item) => {
      if (item.id === element) {
        itemGenres.push(item.name);
      }
    });
  });
  let key = 0;
  itemGenres = itemGenres.map((item) => {
    key += 1;
    return (
      <div key={key} className="item--genre">
        {item}
      </div>
    );
  });
  return itemGenres;
}

function calculationRatedColor(vote) {
  const dataColor = {
    0: 'rated-clr-r',
    1: 'rated-clr-r',
    2: 'rated-clr-r',
    3: 'rated-clr-r',
    4: 'rated-clr-o',
    5: 'rated-clr-o',
    6: 'rated-clr-y',
    7: 'rated-clr-y',
    8: 'rated-clr-g',
    9: 'rated-clr-g',
    10: 'rated-clr-g',
  };
  return dataColor[Math.floor(vote)];
}

function ifNotPoster(urlPoster) {
  if (urlPoster) {
    return <img className="item--poster" src={`https://image.tmdb.org/t/p/w200/${urlPoster}`} alt="film poster" />;
  }
  return null;
}

function ifNotReleaseDate(date) {
  if (date) {
    return <p className="item--releaseDate">{format(new Date(Date.parse(date)), 'PP')}</p>;
  }
  return null;
}

function Item({ data, eventRequestAddRating, eventRequestDeleteRating }) {
  const { id, title, releaseDate, voteAverage, overview, poster, rating, genres } = data;

  const itemGenres = calculationGenres(genres);
  const colorVoteAverage = calculationRatedColor(voteAverage);
  const itemPoster = ifNotPoster(poster);
  const itemReleaseDate = ifNotReleaseDate(releaseDate);

  let itemRate = <Rate className="item--rate" count={10} onChange={(number) => eventRequestAddRating(id, number)} />;
  let delButton = null;
  if (rating) {
    itemRate = (
      <Rate
        className="item--rate"
        disabled
        value={rating}
        count={10}
        onChange={(number) => eventRequestAddRating(id, number)}
      />
    );
    delButton = (
      <button className="item--deleteButton" type="button" onClick={() => eventRequestDeleteRating(id)}>
        X
      </button>
    );
  }

  return (
    <div className="item">
      {delButton}
      {itemPoster}
      <div className="item__description">
        <div className={`item__rated ${colorVoteAverage}`}>
          <p className="item--voteAverage">{voteAverage}</p>
        </div>
        <h2 className="item--title">{title}</h2>
        {itemReleaseDate}
        <div className="item__genres">{itemGenres}</div>
        <p className="item--overview">{overview}</p>
        {itemRate}
      </div>
    </div>
  );
}

export default Item;

Item.defaultProps = {
  eventRequestAddRating: () => {},
  eventRequestDeleteRating: () => {},
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
  eventRequestAddRating: PropTypes.func,
  eventRequestDeleteRating: PropTypes.func,
};
