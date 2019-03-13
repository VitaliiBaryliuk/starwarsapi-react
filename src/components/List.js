import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import {ApiUrlContext} from './../ApiUrlContext'
import SwApi from '../api/SwApi'


export default class List extends React.Component {
  state = {
    list: [],
    keyValue: '',
  }

  static contextType = ApiUrlContext;

  async componentDidMount() {
    const category = this.props.match.params.category
    const list = await SwApi.getApiDataList(category) 

    this.setState({
      list: list.results,
      keyValue: Object.keys(list.results[0])[0]
    })
  }  

  render() {
    const { list, keyValue } = this.state

    return ( 
      !list.length ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
      <div className="table-wrapper">
        <ul className="list">
          {list.map(item =>
              <ListItem key={item[keyValue]} name={item[keyValue]} url={item.url} />
          )}
        </ul>
      </div> 
    )
  }
}

const ListItem = ({name, url}) => {
  const id = url.match(/[0-9]+/)

  return(
    <ApiUrlContext.Consumer>
      {({setCurrentApiLink}) => 
        <Fragment>
          <li className="list__item">
            <NavLink to={`/people/${id}`} onClick={() => setCurrentApiLink(url)}>
                {name}
            </NavLink>
          </li>
        </Fragment>
      }
    </ApiUrlContext.Consumer>
  )
}