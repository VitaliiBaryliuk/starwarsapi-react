import React from 'react';
import {Route, NavLink, Switch } from 'react-router-dom';

import HomePage from './components/HomePage'
import ViewerPage from './components/ViewerPage'
import DataTable from './components/DataTable/DataTable'

import './index.scss'
import logo from './images/logo.png'

const allowedCategories = [
  'people', 'planets' ,'films', 'species', 'vehicles', 'starships'
];

const App = () => {

  return (
    <div className="App">
      <header>
        <NavLink to=''>
          <img src={logo} className="header__logo" alt="StarWars" />
        </NavLink>
      </header>  
      <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path={`/:category(${ allowedCategories.join('|') })`} component={DataTable} />
            <Route path={`/:category(${ allowedCategories.join('|') })/:id([0-9]+)`}  component={ViewerPage} />
            <Route render={() => <h3>Page not found</h3>} />
          </Switch>
        </div>
    </div>
  )
}

export default App;