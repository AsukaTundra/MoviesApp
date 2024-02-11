import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Flex } from 'antd';

import './list-item.css';

import Item from '../item';

function ListItem({ dataMovies, eventRequestAddRating, eventRequestDeleteRating }) {
  let key = 0;
  function assemblyListItem() {
    return dataMovies.map((data) => {
      key += 1;
      return (
        <Item
          key={key}
          data={data}
          eventRequestAddRating={eventRequestAddRating}
          eventRequestDeleteRating={eventRequestDeleteRating}
        />
      );
    });
  }

  const items =
    dataMovies.length === 0 ? (
      <Alert className="noResultsDiv" message="No results" type="info" banner />
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

ListItem.defaultProps = {
  eventRequestAddRating: () => {},
  eventRequestDeleteRating: () => {},
};

ListItem.propTypes = {
  dataMovies: PropTypes.array.isRequired,
  eventRequestAddRating: PropTypes.func,
  eventRequestDeleteRating: PropTypes.func,
};
