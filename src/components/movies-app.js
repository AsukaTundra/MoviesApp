import React from 'react';
import { Online, Offline } from 'react-detect-offline';

import sortDataFilms from '../services/sort-data';

import './movies-app.css';
import MainMenu from './main-menu';
import Search from './search';
import ListItem from './list-item';
import Paging from './paging';
import SpinLoading from './spin-loading';
import AlertError from './alert-error';

export default class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      isError: false,
      filmData: [],
    };
  }

  render() {
    const { isLoaded, isError, filmData } = this.state;

    if (!isLoaded && !isError) {
      sortDataFilms().then((data) => {
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
            <Search />
            {error}
            {loading}
            {content}
            <Paging />
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
