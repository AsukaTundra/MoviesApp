import React, { createContext } from 'react';
import { Online, Offline } from 'react-detect-offline';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './movies-app.css';

import Movies from '../services/movies';
import GuestSession from '../services/guest-session';
import RatingList from '../services/rating-list';
import AddRating from '../services/add-rating';
import DeleteRating from '../services/delete-rating';
import GetGenres from '../services/genres';
import MainMenu from '../components/main-menu';
import ListItem from '../components/list-item';
import Search from '../components/search';
import Paging from '../components/paging';

export const context = createContext([]);

export default class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      guestSessionId: null,
      indicatorLoad: true,
      indicatorError: false,
      dataMovies: [],
      dataGenres: [],
      currentMenu: 'search',
      currentSearch: '',
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.requestCreateSession();
    this.requestLoadGenres();
  }

  componentDidUpdate() {
    this.requestMovies();
  }

  requestCreateSession = () => {
    GuestSession()
      .then((result) => {
        this.setState({
          guestSessionId: result,
        });
      })
      .catch(() => {
        this.setState({
          indicatorError: true,
        });
      });
  };

  requestLoadGenres = () => {
    GetGenres()
      .then((result) => {
        this.setState({
          dataGenres: result,
        });
      })
      .catch(() => {
        this.setState({
          indicatorError: true,
        });
      });
  };

  requestMovies = () => {
    const { guestSessionId, indicatorLoad, indicatorError, currentMenu, currentSearch, currentPage } = this.state;
    if (!indicatorLoad && !indicatorError) {
      const request =
        currentMenu === 'search' ? Movies(currentSearch, currentPage) : RatingList(guestSessionId, currentPage);
      request
        .then((result) => {
          this.setState({
            indicatorLoad: true,
            dataMovies: result,
          });
        })
        .catch(() => {
          this.setState({
            indicatorError: true,
          });
        });
    }
  };

  eventRequestAddRating = (idMovies, valueRating) => {
    const { guestSessionId } = this.state;
    AddRating(guestSessionId, idMovies, valueRating).catch(() => {
      alert('Server error, failed');
    });
  };

  eventRequestDeleteRating = (idMovies) => {
    const { guestSessionId } = this.state;
    DeleteRating(guestSessionId, idMovies)
      .then(() => {
        setTimeout(() => {
          this.setState({
            indicatorLoad: false,
          });
        }, 350);
      })
      .catch(() => {
        alert('Server error, failed');
      });
  };

  eventMenu = (valueNewMenu) => {
    const { currentMenu } = this.state;
    if (currentMenu !== valueNewMenu) {
      this.setState({
        indicatorLoad: false,
        currentMenu: valueNewMenu,
        currentPage: 1,
      });
    }
  };

  eventSearch = (valueNewSearch) => {
    if (valueNewSearch.trim()) {
      this.setState({
        indicatorLoad: false,
        currentSearch: valueNewSearch,
        currentPage: 1,
      });
    }
  };

  eventPage = (valueNewPage) => {
    const { currentPage } = this.state;
    this.setState({
      indicatorLoad: false,
      currentPage: valueNewPage,
    });
    if (currentPage < valueNewPage) {
      document.body.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { indicatorLoad, indicatorError, dataMovies, dataGenres, currentMenu, currentPage } = this.state;
    const searchField = currentMenu === 'search' ? <Search eventSearch={this.eventSearch} /> : null;
    const moviesList =
      indicatorLoad && !indicatorError ? (
        <ListItem
          dataMovies={dataMovies}
          eventRequestAddRating={this.eventRequestAddRating}
          eventRequestDeleteRating={this.eventRequestDeleteRating}
        />
      ) : null;
    const loadingSpin =
      !indicatorLoad && !indicatorError ? (
        <div className="movies-app__loadingSpin">
          <Spin size="large" indicator={<LoadingOutlined className="movies-app--loadingOutlined" spin />} />
        </div>
      ) : null;
    const errorAlert =
      !indicatorLoad && indicatorError ? (
        <Alert className="movies-app--alertError" message="Server error, try again later..." type="error" banner />
      ) : null;

    return (
      <>
        <Online>
          <div className="movies-app">
            <context.Provider value={dataGenres}>
              <MainMenu eventMenu={this.eventMenu} />
              {searchField}
              {moviesList || loadingSpin || errorAlert}
              <Paging currentPage={currentPage} eventPage={this.eventPage} />
            </context.Provider>
          </div>
        </Online>

        <Offline>
          <Alert className="alertOffline" message="Connection loss" type="error" banner />
        </Offline>
      </>
    );
  }
}
