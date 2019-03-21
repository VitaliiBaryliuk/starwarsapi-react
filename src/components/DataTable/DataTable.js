import React from 'react'

import SwApi from '../../api/SwApi'
import columnConfig from '../../api/columnConfig'
import Pagination from './Pagination'
import Preloader from '../Preloader'
import Utils from '../utils'

export default class DataTable extends React.Component {
  state = {
    list: [],
    isLoaded: false,
    sortAsc: true,
    sortColumn: null,
    columnConfig: {},
    perPage: 5,
    page: 1,
    query: '',
  }

  async componentDidMount() {
    const category = this.props.match.params.category
    const list = await SwApi.getApiDataList(category) 

    this.setState({
      list: list.results,
      isLoaded: true,
      keyValue: Object.keys(list.results[0])[0],
      columnConfig: columnConfig[category]
    })
  }

  updateQuery = (query) => {
    this.setState({
      query,
      page: 1,
    })
  }

  listSort = ({ list, sortColumn, sortAsc }) => {
    if (!sortColumn) {
      return list;
    }

    const sign = sortAsc ? 1 : -1;
    const sortFn = !isNaN(+list[0][sortColumn])
      ? (a, b) => sign * (a[sortColumn] - b[sortColumn])
      : (a, b) => sign * a[sortColumn].localeCompare(b[sortColumn])
    ;

     return [...list].sort(sortFn);
  }

  listFiler = ({list, query}) => {
    const queryReg = RegExp(query, 'i')
    const category = this.props.match.params.category
    const compairedProperty = Object.keys(columnConfig[category])[0]
    
    return list.filter(item => queryReg.test(item[compairedProperty]))
  }

  listPaginate = ({list, page, perPage}) => {
    const start = (page - 1) * perPage
    const end = start + perPage

    return list.slice(start, end)
  }

  handleHeaderClick = (key) => {
    this.setState(({sortAsc, sortColumn}) =>{

      return {
        sortColumn: key,
        sortAsc: sortColumn === key ? !sortAsc : true,
      }
    })
  };

  handlerPaginationClick = (targetPage) => {
    this.setState({
      page: targetPage
    })
  }

  handlerSearchChange = ({target}) => {
    const newQuery = target.value

    const debouncedUpdateQuery = Utils.debounce(this.updateQuery, 1000)
    debouncedUpdateQuery(newQuery)
  }

  render() {
    const { 
      list,
      columnConfig,
      sortAsc,
      sortColumn,
      page,
      perPage,
      query,
      isLoaded
    } = this.state

    const sortedList = this.listSort({
      list,
      sortColumn,
      sortAsc,
    });

    const filtredList = this.listFiler({
      list: sortedList,
      query,
    })

    const visibleList = this.listPaginate({
      list: filtredList,
      page,
      perPage
    })

    return ( 
      !isLoaded ? <Preloader />
      : <React.Fragment>
        <div className='filters'>
          <input 
            type='text' 
            className='filters__search-input'
            placeholder='Search...'
            onChange={(event) => this.handlerSearchChange(event)}
          />
        </div>
        <table className="data-table">
          <tbody>
            <tr>
              {Object.entries(columnConfig).map(([key, itemValue ])=> 
                <th className="data-table__title" key={itemValue.title} onClick={ itemValue.isSortable 
                  ? () => this.handleHeaderClick(key)
                  : null
                }>
                  {itemValue.title}
                </th>
              )}
            </tr>
            {visibleList.map((item, index) => 
              <tr key={index}>
                {Object.entries(columnConfig).map(([key, itemValue ], index) =>
                  <td className="data-table__item" key={`${item[key]}${index}`} >
                    {itemValue.render 
                      ? itemValue.render(item.url.match(/[0-9]+/), item[key])
                      : item[key]}
                  </td>
                )}
              </tr>
            )}  
          </tbody>
        </table>
        <Pagination 
          perPage={perPage}
          totalCount={filtredList.length}
          onPageChange={this.handlerPaginationClick}
        />
      </React.Fragment>  
    )
  }
}