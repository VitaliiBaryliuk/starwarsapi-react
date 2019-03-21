import React from 'react'
import {NavLink} from 'react-router-dom'

import Preloader from './Preloader'
import SwApi from '../api/SwApi'

export default class ViewerPage extends React.Component {
  state = {
    item: {},
    isLoaded: false,
    titles: [],
  }
  
  async componentDidMount() {
    const category = this.props.match.params.category;
    const id = this.props.match.params.id;
    const item = await SwApi.getApiDataItem(category, id)

    this.setState({
      item,
      isLoaded: true,
      titles: Object.keys(item)
    })
  } 
  
  componentWillReceiveProps = (nextProps)=> {
    window.location.reload()
  }

  render() {
    const { item, isLoaded, titles } = this.state

    return ( 
      !isLoaded ? <Preloader />
      : <div className="viewer-wrapper">
        <table className="viewer-table">
          <tbody>
            {titles.map(title =>
              Array.isArray(item[title])
              ? <tr key={title}>
                  <td className="viewer-table__cell title">{title}:</td>
                  <td className="viewer-table__cell desc">
                    <ul>
                      {item[title].map(link =>
                        <li key={link}>
                          <NavLink to={link.match(/[https://swapi.co/api/]\w+\/[0-9]+/gm)[0]}>
                            {link}
                          </NavLink> 
                        </li>   
                      )}
                    </ul> 
                  </td>
                </tr>
              : typeof item[title] === 'string' && item[title].includes('http')
              ? <tr key={title}>
                <td className="viewer-table__cell title">{title}:</td>
                <td className="viewer-table__cell desc">
                  <NavLink to={item[title].match(/[https://swapi.co/api/]\w+\/[0-9]+/gm)[0]}>  
                    {item[title]}
                  </NavLink> 
                </td>
              </tr>
              : <tr key={title}>
                <td className="viewer-table__cell title">{title}:</td>
                <td className="viewer-table__cell desc">{item[title]}</td>
              </tr>
            )}
          </tbody>  
        </table>
      </div>  
    )
  }
}