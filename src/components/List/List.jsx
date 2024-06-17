import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './List.scss';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const renderSkeletonLoader = (num) => {
  const skeleton = [...Array(num)].map((elm, index) => <Card key={index} />);

  return skeleton;
};

const List = ({
  data,
  isLoading,
  setShowModal,
  setPhotoDetails,
  toggleValue,
  setToggleValue,
}) => {
  const { width } = useWindowDimensions();

  const [listNumber, setListNumber] = useState(3);

  useEffect(() => {
    if (width < 1440) {
      setToggleValue(true);
      setListNumber(3);
    }
    if (width < 1024) {
      setListNumber(2);
    }
    if (width < 768) {
      setListNumber(1);
    }
  }, [width]);

  return (
    <section className='photo-list-container'>
      <div
        className={
          toggleValue ? `photo-list-${listNumber}` : 'photo-list-3 photo-list-5'
        }
      >
        {isLoading
          ? renderSkeletonLoader(4)
          : data.photos.results &&
            data.photos.results.map((photo) => (
              <Card
                key={photo.id}
                imgSrc={photo.urls.regular}
                imgDetails={photo.user}
                imgTags={photo.tags}
                setShowModal={setShowModal}
                setPhotoDetails={setPhotoDetails}
                photoId={photo.id}
              />
            ))}
      </div>
    </section>
  );
};

export default List;
