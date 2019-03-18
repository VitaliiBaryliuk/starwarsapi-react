import React, {Fragment} from 'react'

import SwApi from '../api/SwApi'

export default class ViewerPage extends React.Component {
  state = {
    item: [],
    titles: [],
  }
  
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
                <tr key={title}>
                  <td className="table__cell title">{title}:</td>
                  <td className="table__cell desc">{item[title]}</td>
                </tr>
              )}
            </tbody>  
          </table>}
        </Fragment>  
    )
  }
}