import React, {Component} from 'react'

import {Link} from 'react-router-dom';
import SwApi from '../api/SwApi'
import Preloader from './Preloader'
 
export default class HomePage extends Component {
  state = {
    categories: [],
    isLoaded: false,
  }

  async componentDidMount() {
    const categories = await SwApi.getRootApiData()
    
    this.setState({
      categories,
      isLoaded: true
    })
  }  

  render() {
    const { categories, isLoaded } = this.state 
    
    return(
      !isLoaded 
      ? <Preloader /> 
      : <div className="home-page">
        {Object.keys(categories).map(category =>
          <div className='home-page__category-item' key={category}>
            <Link to={`/${category}`}>
              {category}
            </Link>
          </div>  
        )}
      </div> 
    )
  }
}
