import React from 'react';
import './Pagination.scss';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className='paginationWrapper'>
      <div className='paginationWrapper--box'>
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
