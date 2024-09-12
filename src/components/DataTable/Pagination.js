import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({perPage, totalCount, onPageChange}) => {
  const pagesCount = Math.ceil(totalCount / perPage)
  const pages = Array(pagesCount).fill(0).map((_, i) => i + 1)

  return(
    <div className='pagination'>
      {pages.map(p => 
      <button 
      className='pagination__button'
      key={p} 
      onClick={() => onPageChange(p)}>
        {p}          
      </button>
      )}
    </div>
  )
}

Pagination.propTypes = {
  perPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination