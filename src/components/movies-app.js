import './movies-app.css';
import MainMenu from './main-menu';
import Search from './search';
import ListItem from './list-item';
import Paging from './paging';

function MoviesApp() {
  return (
    <div className="movies-app">
      <MainMenu />
      <Search />
      <ListItem />
      <Paging />
    </div>
  );
}

export default MoviesApp;
