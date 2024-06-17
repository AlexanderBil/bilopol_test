import React from 'react';
import img from '../../assets/images/f32.png';
import './Modal.scss';
import axiosInstance from '../../axios';

const Modal = ({ photoDetails, setShowModal, setQuery, userCollections, setStatusHandler }) => {
  const handleClickTag = (title) => {
    setQuery(title);
    setShowModal(false);
    window.scrollTo(0, 0);
  };

  const {photoId} = photoDetails
  
const collectionId = userCollections[0].id
  console.log('userCollections', userCollections);

  const addToCollectionHandler = async () => {
    try{
      await axiosInstance.post(`/collections/${collectionId}/add`,
        {
          photo_id: photoId,
        }
      );
      setShowModal(false);
      setStatusHandler();
    }catch(e){
      console.log('Can not add foto!!!');
    }

  };

  return (
    <div className='modal-container'>
      <div className='modal-dialogue'>
        <div className='modal-dialogue--inner'>
          <div className='modal-dialogue--image'>
            <img src={photoDetails.imgSrc} alt='' />
          </div>
          <div className='modal-dialogue--caption'>
            <h4>{photoDetails.imgDetails.name}</h4>
            <p>{photoDetails.imgDetails.location}</p>
            <div className='modal-dialogue--tags'>
              {photoDetails.imgTags.map((item, i) => (
                <p key={i} onClick={() => handleClickTag(item.title)}>
                  {item.title}
                </p>
              ))}
            </div>
            <div className='modal-dialogue--collection'>
        <img
          onClick={addToCollectionHandler}
          className='card--add-foto'
          src={img}
          alt=''
        />
      </div>
          </div>
        </div>
        <div
          className='modal-dialogue--inner--close'
          onClick={() => setShowModal && setShowModal(false)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default Modal;
