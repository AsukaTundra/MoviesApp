import React from 'react';
import { Online, Offline } from 'react-detect-offline';

import './movies-app.css';
import SortDataFilms from '../../services/sort-data';
import MainMenu from '../main-menu';
import Search from '../search';
import ListItem from '../list-item';
import Paging from '../paging';
import SpinLoading from '../spin-loading';
import AlertError from '../alert-error';

export default class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      isError: false,
      filmData: [],
      search: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchToServer();
  }

  componentDidUpdate() {
    this.fetchToServer();
  }

  eventSearch = (value) => {
    if (value.trim()) {
      this.setState(() => {
        return {
          isLoaded: false,
          search: value,
          page: 1,
        };
      });
    }
  };

  eventPage = (value) => {
    if (this.state.page < value) {
      document.body.scrollIntoView({
        behavior: 'smooth',
      });
    }
    this.setState(() => {
      return {
        isLoaded: false,
        page: value,
      };
    });
  };

  fetchToServer() {
    const { isLoaded, isError, search, page } = this.state;
    if (!isLoaded && !isError) {
      SortDataFilms(search, page).then((data) => {
        if (data instanceof Error) {
          this.setState({
            isError: true,
          });
        } else {
          this.setState({
            isLoaded: true,
            filmData: data,
          });
        }
      });
    }
  }

  render() {
    const { isLoaded, isError, filmData, search, page } = this.state;
    const error =
      !isLoaded && isError ? (
        <div className="errorDiv">
          <AlertError message="Server error, try again later..." />
        </div>
      ) : null;
    const loading =
      !isLoaded && !isError ? (
        <div className="loadingSpin">
          <SpinLoading />
        </div>
      ) : null;
    const content = isLoaded && !isError ? <ListItem filmData={filmData} /> : null;

    return (
      <>
        <Online>
          <div className="movies-app">
            <MainMenu />
            <Search currentSearch={search} eventSearch={this.eventSearch} />
            {error}
            {loading}
            {content}
            <Paging currentPage={page} eventPage={this.eventPage} />
          </div>
        </Online>

        <Offline>
          <div className="movies-app-offline">
            <AlertError message="Connection loss" />
          </div>
        </Offline>
      </>
    );
  }
}
