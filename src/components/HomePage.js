import React, {Component} from 'react'

import {Link} from 'react-router-dom';
import SwApi from '../api/SwApi'
 
export default class HomePage extends Component {
  state = {
    categories: []
  }

  async componentDidMount() {
    const categories = await SwApi.getRootApiData()
    
    this.setState({
      categories
    })
  }  


  render() {
    const { categories } = this.state 
    
    return(
        <div className="home-page">
        {!categories.toString() ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
        Object.keys(categories).map(category =>
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