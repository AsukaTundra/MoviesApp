import PropTypes from 'prop-types';
import { Menu } from 'antd';

import './main-menu.scss';

function MainMenu({ eventMenu }) {
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
      <Menu mode="horizontal" defaultSelectedKeys="search" items={menuItem} onClick={(e) => eventMenu(e.key)} />
    </div>
  );
}

export default MainMenu;

MainMenu.defaultProps = {
  eventMenu: () => {},
};

MainMenu.propTypes = {
  eventMenu: PropTypes.func,
};
