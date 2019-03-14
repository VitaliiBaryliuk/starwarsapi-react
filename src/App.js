import React, { Component } from 'react';
import {Route, NavLink, Switch } from 'react-router-dom';

import logo from './images/logo.png'
import './App.css';
import './index.css'
import './index.scss'
import HomePage from './components/HomePage'
import Table from './components/Table'
import {ApiUrlContext} from './ApiUrlContext'
import DataTable from './components/DataTable/DataTable'

const BASE_URL = 'https://swapi.co/api/'

const allowedCategories = [
  'people', 'planets' ,'films', 'species', 'vehicles', 'starships'
];

class App extends Component {
  state = {
      apiLink: BASE_URL,
      setCurrentApiLink: this.setCurrentApiLink.bind(this),
  }

  async setCurrentApiLink(apiLink) {

    this.setState({
        apiLink
    })
  }

  render() {
    return (
      <ApiUrlContext.Provider value={this.state}>
        <div className="App">
          <header>
                <NavLink to='/' onClick={() => this.setCurrentApiLink(BASE_URL)}>
                  <img src={logo} className="header__logo" alt="StarWars" />
                </NavLink>
          </header>  
          <div className="container-fluid">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path={`/:category(${ allowedCategories.join('|') })`} component={DataTable} />
                <Route path={`/:category(${ allowedCategories.join('|') })/:id([0-9]+)`}  component={Table} />
                <Route render={() => <h3>Page not found</h3>} />
              </Switch>
            </div>
        </div>
      </ApiUrlContext.Provider>
    )
  }
}

export default App;