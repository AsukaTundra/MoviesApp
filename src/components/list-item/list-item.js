import React from 'react';
import { Alert, Flex } from 'antd';

import './list-item.css';
import Item from '../item';

function ListItem({ filmData }) {
  let key = 0;

  function assemblyListItem() {
    return filmData.map((data) => {
      key += 1;
      return (
        <Item
          key={key}
          title={data.title}
          releaseDate={data.releaseDate}
          voteAverage={data.voteAverage}
          overview={data.overview}
          poster={data.poster}
        />
      );
    });
  }

  const items =
    filmData.length === 0 ? (
      <div className="noResultsDiv">
        <Alert message="No results" type="info" banner />
      </div>
    ) : (
      assemblyListItem()
    );

  return (
    <Flex wrap="wrap" justify="space-evenly">
      {items}
    </Flex>
  );
}

export default ListItem;
