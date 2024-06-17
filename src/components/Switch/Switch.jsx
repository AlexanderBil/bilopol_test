import React from 'react';
import './Switch.scss';

const Switch = ({ isOn, toggleSwitchHandler }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={toggleSwitchHandler}
        className='react-switch-checkbox'
        id={`react-switch-new`}
        type='checkbox'
      />
      <label
        style={{ background: isOn && 'rgb(124 83 46 / 68%)' }}
        className='react-switch-label'
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
