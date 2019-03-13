import React, {Component} from 'react'

import { Link } from 'react-router-dom';

import {ApiUrlContext} from './../ApiUrlContext'
import SwApi from '../api/SwApi'

 
export default class HomePage extends Component {
  state = {
    categories: []
  }

  static contextType = ApiUrlContext
  
  async componentDidMount() {
    const categories = await SwApi.getRootApiData()
    
    this.setState({
      categories
    })
  }  


  render() {
    const { categories } = this.state 
    
    return(
      <ApiUrlContext.Consumer>
        {({setCurrentApiLink}) => 
          <div className="home-page">
          {!categories.toString() ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
          Object.keys(categories).map(category =>
            <div className='home-page__category-item' key={category}>
              <Link to={`/${category}`} onClick={() => setCurrentApiLink(categories[category])}>
                {category}
              </Link>
            </div>  
          )}
        </div> 
      }
      </ApiUrlContext.Consumer>
    )
  }
}