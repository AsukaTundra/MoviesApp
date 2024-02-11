import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import './paging.css';

function Paging({ currentPage, eventPage }) {
  return (
    <div className="paging">
      <Pagination simple current={currentPage} total={500} showSizeChanger={false} onChange={eventPage} />
    </div>
  );
}

export default Paging;

Paging.defaultProps = {
  eventPage: () => {},
};

Paging.propTypes = {
  currentPage: PropTypes.number.isRequired,
  eventPage: PropTypes.func,
};
