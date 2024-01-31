import './item.css';

function Item({ title, releaseDate, voteAverage, overview, poster }) {
  return (
    <div className="item">
      {poster}
      <div className="description">
        <div className="rated">
          <p className="voteAverage">{voteAverage}</p>
        </div>
        <h2 className="title">{title}</h2>
        {releaseDate}
        <div className="genres">
          <div className="genre">Action</div>
          <div className="genre">Drama</div>
        </div>
        <p className="overview">{overview}</p>
      </div>
    </div>
  );
}

export default Item;
