import React from 'react';
import './SearchResultHeader.scss';

const SearchResultHeader = ({handleSearch, query}) => {
 

  return (
    <div className='result-header'>
      <button onClick={handleSearch}>Search</button>
      <p>
        Search Results for <span>"{query}"</span>
      </p>
    </div>
  );
};

export default SearchResultHeader;
