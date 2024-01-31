import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './spin.css';

function SpinLoading() {
  return <Spin size="large" indicator={<LoadingOutlined className="loadingOutlined" spin />} />;
}

export default SpinLoading;
