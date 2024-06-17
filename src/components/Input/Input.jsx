import React from 'react';
import './Input.scss';

const Input = ({
  query,
  setQuery,
}) => {

  return (
    <form
      className='header-form'
    >
      <div className='icon-block'>
        <img src='./search.svg' alt='search-icon' width='20' />
      </div>
      <input
        type='text'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className='form-control'
        placeholder='Search for photo'
      />
    </form>
  );
};

export default Input;
