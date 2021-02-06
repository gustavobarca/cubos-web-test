import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Pages
 */

import Movies from 'pages/Movies';
import MovieDetail from 'pages/MovieDetail';

export enum Paths {
  Movies = '/',
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Movies />
        </Route>
        <Route exact path="/movies/:id">
          <MovieDetail />
        </Route>
      </Switch>
    </Router>
  );
}
