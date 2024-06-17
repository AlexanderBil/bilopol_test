import React from 'react';
import './Card.scss';

const Card = ({
  imgSrc,
  imgDetails,
  imgTags,
  setShowModal,
  setPhotoDetails,
  photoId,
}) => {
  const handleShowModal = (imgSrc, imgDetails, imgTags) => {

   
    const data = {
      imgSrc,
      imgDetails,
      imgTags,
      photoId
    };

    setShowModal && setShowModal(true);
    setPhotoDetails && setPhotoDetails(data);
  };

  return (
    <div
      className={`card`}
      onClick={() => handleShowModal(imgSrc, imgDetails, imgTags)}
    >
      {imgSrc && (
        <div className='card--image-wrap'>
          <img src={imgSrc} alt='Unsplash' />
        </div>
      )}
      {imgDetails && (
        <div className='card--info'>
          <h4>{imgDetails.name}</h4>
          <p>{imgDetails.location}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
