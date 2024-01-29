import React from 'react';
import { Flex } from 'antd';

import './list-item.css';
import Item from '../item';
import FetchFilms from '../../services/fetch-films';

export default class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      arrayFilm: [],
    };
  }

  render() {
    const { isLoaded, arrayFilm } = this.state;
    let elements;

    if (isLoaded) {
      elements = arrayFilm.map((item) => {
        return (
          <Item
            // НОРМАЛЬНО ЗАДАТЬ key
            key={Math.random()}
            title={item.title}
            releaseDate={item.release_date}
            voteAverage={item.vote_average}
            overview={item.overview}
            poster={item.poster_path}
          />
        );
      });
    } else {
      FetchFilms().then((result) => {
        this.setState({
          isLoaded: true,
          arrayFilm: result.results,
        });
      });
    }

    return (
      <Flex wrap="wrap" justify="space-evenly">
        {elements}
      </Flex>
    );
  }
}
