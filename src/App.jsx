import React, { useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import MainSection from './components/MainSection/MainSection';
import Toast from './components/Toast/Toast';


const App = () => {

const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
const [userCollections, setUserCollections] = useState([]);
const [status, setStatus] = useState(0);

const setStatusHandler = () => {
  setStatus(200)
  setTimeout(() => {
  setStatus(0)
  },[2000])
}


  return (
    <>
     <Toast status={status} />   
    <Routes>
    <Route path='/' element = {<MainSection setStatusHandler={setStatusHandler} userInfo={userInfo} setUserInfo={setUserInfo} userCollections={userCollections} setUserCollections={setUserCollections} to='/' />} />
    <Route path='/profile' element = {<Profile setStatusHandler={setStatusHandler} userInfo={userInfo} userCollections={userCollections} setUserCollections={setUserCollections} to='/profile' />} />
    </Routes>
    </>

  );
};

export default App;
