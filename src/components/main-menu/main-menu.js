import { Menu } from 'antd';

import './main-menu.css';

function MainMenu() {
  const menuItem = [
    {
      label: 'Search',
      key: 'search',
    },
    {
      label: 'Rated',
      key: 'rated',
    },
  ];

  return (
    <div className="main-menu">
      <Menu mode="horizontal" items={menuItem} />
    </div>
  );
}

export default MainMenu;
