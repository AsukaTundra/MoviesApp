import { useContext } from 'react';
import { Rate } from 'antd';

import './item.css';

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
      <div key={key} className="genre">
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

function Item({ data, eventRequestAddRating, eventRequestDeleteRating }) {
  const { id, title, releaseDate, voteAverage, overview, poster, rating, genres } = data;

  const itemGenres = calculationGenres(genres);
  const colorVoteAverage = calculationRatedColor(voteAverage);

  let itemRate = <Rate className="rate" count={10} onChange={(number) => eventRequestAddRating(id, number)} />;
  let delButton = null;
  if (rating) {
    itemRate = (
      <Rate
        className="rate"
        disabled
        value={rating}
        count={10}
        onChange={(number) => eventRequestAddRating(id, number)}
      />
    );
    delButton = (
      <button className="deleteButton" type="button" onClick={() => eventRequestDeleteRating(id)}>
        X
      </button>
    );
  }

  return (
    <div className="item">
      {delButton}
      {poster}
      <div className="description">
        <div className={`rated ${colorVoteAverage}`}>
          <p className="voteAverage">{voteAverage}</p>
        </div>
        <h2 className="title">{title}</h2>
        {releaseDate}
        <div className="genres">{itemGenres}</div>
        <p className="overview">{overview}</p>
        {itemRate}
      </div>
    </div>
  );
}

export default Item;
