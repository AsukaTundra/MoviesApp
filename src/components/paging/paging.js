import { Pagination } from 'antd';

import './paging.css';

function Paging() {
  return (
    <div className="paging">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}

export default Paging;
