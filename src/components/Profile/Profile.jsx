import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios';


const Profile = ({userInfo, userCollections, setUserCollections, setStatusHandler}) => {

  const [error, setError] = useState('')

  const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate()

    const userCollectionsVals = Object.entries(userCollections).map(function (i) {
      return i[1].preview_photos;
  });

  const getUserListCollectionsHandler =  async () => {
    try{
      const data = userInfo && await axiosInstance.get(`/users/${userInfo.username}/collections`);
      setUserCollections(data?.data);
      setError('')
    }catch(e){
      setError(e.message)
    }
}

    useEffect(() => {
       token && getUserListCollectionsHandler()
    }, [])

    const deleteFotoByIdHandler = async (photoId, collectionId) => {
      try {
        await axiosInstance.delete(`collections/${collectionId}/remove`,
          {data:{
            collection_id: collectionId,
            photo_id: photoId,
          }}
        );
        setStatusHandler()
        navigate('/')
      } catch(e){
      }
    }

 
  return (
    <div className='profile-container'>
      <div className='profile-container-header'>
        <button onClick={() => navigate(-1)} ><img src="./images/back-arrow.svg" alt="back"/></button>
        <h1>Profile</h1>
        <span>{userInfo.name}</span>
      </div>
      {
        error ? <h3>{error}</h3> :    <div className='profile-container-box'>
        { userCollectionsVals.map((item, i) => (
          item && item.map(photo => 
              <div className='profile-container-box-card'>
                <span className='removeItem' onClick={() => deleteFotoByIdHandler(photo.id, userCollections[i].id)}></span>
                <img src={photo.urls.full} alt={photo.slug} />
              </div>
          )
          ))
        }
      </div>
      }
   
    </div>
  );
};

export default Profile;
