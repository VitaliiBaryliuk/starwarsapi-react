import React, {Fragment} from 'react'

import {ApiUrlContext} from './../ApiUrlContext'
import SwApi from '../api/SwApi'

export default class Table extends React.Component {
  state = {
    item: [],
    titles: [],
  }

  static contextType = ApiUrlContext;

  async componentDidMount() {
    const category = this.props.match.params.category;
    const id = this.props.match.params.id;

    const item = await SwApi.getApiDataItem(category, id)

    this.setState({
      item,
      titles: Object.keys(item)
    })
  }  

  render() {
    const { item, titles } = this.state

    return ( 
        <Fragment>
          {!titles.length ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
          <table className="table">
            <tbody>
              {titles.map(title =>
                <tr>
                  <td className="table__cell title">{title}:</td> <td className="table__cell desc">{item[title]}</td>
                </tr>
              )}
            </tbody>  
          </table>}
        </Fragment>  
    )
  }
}