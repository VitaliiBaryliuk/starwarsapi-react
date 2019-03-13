import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import SwApi from '../../api/SwApi'


export default class DataTable extends React.Component {
  state = {
    list: [],
    sortAsc: true,
  }

  sortList = () => {
    this.setState(({sortAsc}) =>{
      return {
        sortAsc: !sortAsc
      }
    })

  };

  async componentDidMount() {
    const category = this.props.match.params.category
    const list = await SwApi.getApiDataList(category) 

    this.setState({
      list: list.results,
      keyValue: Object.keys(list.results[0])[0]
    })
  }  

  render() {
    const { list } = this.state
    const sign = this.state.sortAsc ? 1 : -1;

    list.sort((a, b) => a - b ? 1 : -1 )
    console.log(list)
    
    return ( 
      !list.length ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
        <table className="data-table">
          <tbody>
            <tr>
              {Object.keys(list[0]).slice(0, 7).map(title => 
                <th className="data-table__title" key={title} onClick={() => this.sortList()}>
                  {title}
                </th>
              )}
            </tr>
            {list.map(item => 
              <tr>
                {Object.keys(list[0]).slice(0, 7).map((title, index) =>
                  <td className="data-table__item" key={item[title]} >
                    {index === 0 ? 
                      <NavLink key={item[title]} to={`/people/${item.url.match(/[0-9]+/)}`}>
                        {item[title]}
                      </NavLink> 
                      : item[title]}
                  </td>
                )}
              </tr>
            )}  
          </tbody>
        </table>
    )
  }
}

// const NavItem = ({name, url}) => {
//   const id = url.match(/[0-9]+/)

//   return(
//         <Fragment>
//           <li className="list__item">
//             <NavLink to={`/people/${id}`}>
//                 {name}
//             </NavLink>
//           </li>
//         </Fragment>
//   )
// }