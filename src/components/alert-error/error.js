import { Alert, Space } from 'antd';

import './error.css';

function AlertError({ message }) {
  return (
    <Space className="space" direction="vertical">
      <Alert message={message} type="error" banner />
    </Space>
  );
}

export default AlertError;
