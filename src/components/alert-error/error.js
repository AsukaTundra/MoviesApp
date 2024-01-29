import { Alert, Space } from 'antd';

import './error.css';

function AlertError({ message }) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}>
      <Alert message={message} type="error" banner />
    </Space>
  );
}

export default AlertError;
