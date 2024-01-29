import React from 'react';
import { Flex } from 'antd';

import './list-item.css';
import Item from '../item';

function ListItem({ filmData }) {
  const items = filmData.map((data) => {
    return (
      <Item
        key={Math.random()}
        title={data.title}
        releaseDate={data.release_date}
        voteAverage={data.vote_average}
        overview={data.overview}
        poster={data.poster_path}
      />
    );
  });

  return (
    <Flex wrap="wrap" justify="space-evenly">
      {items}
    </Flex>
  );
}

export default ListItem;
