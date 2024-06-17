import React, { useEffect, useState } from 'react';
import './MainSection.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import useAuth from '../../hooks/useAuth';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import List from '../List/List';
import Switch from '../Switch/Switch';
import Input from '../Input/Input';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useDebounce from '../../hooks/useDebounce';
import useUpdateUrl from '../../hooks/useUpdateUrl';
import SearchResultHeader from '../SearchResultHeaader/SearchResultHeader';


const MainSection = ({userInfo, setUserInfo, userCollections, setUserCollections, setStatusHandler}) => {

  const [accessKey, setAccessKey] = useState('');
  const [data, setData] = useState({ photos: [] });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isResultHeader, setResultHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [errMessage, setErrorMessage] = useState('');
  const [toggleValue, setToggleValue] = useState(false);


  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const token = JSON.parse(localStorage.getItem('token'));

  const [photoDetails, setPhotoDetails] = useState({
    imgSrc: '',
    imgTags: [],
    imgDetails: {
      name: '',
      location: '',
    },
  });

  const { width } = useWindowDimensions();

  const debouncedQueryValue = useDebounce(query, 500);
  const { url } = useUpdateUrl(page, debouncedQueryValue, setResultHeader);
  const navigate = useNavigate();

console.log('errMessage', errMessage);

  const seUserInfoHandler = (data) => {
      setUserInfo((prev) => ({ ...prev, username: data.username, name: data.name,  profile_image: data.profile_image.small}));
      localStorage.setItem('user', JSON.stringify({username: data.username, name: data.name,  profile_image: data.profile_image.small}));
        }
    
        useEffect(() => {
            const getUserInfo = async () => {
              try {
                const data = await axiosInstance.get('/me');
                  seUserInfoHandler(data?.data);
                  setErrorMessage('');
              }catch(e){
                setErrorMessage(e.message)
              }
            }
            !JSON.parse(localStorage.getItem('user')) && token && getUserInfo()
        }, [token])

        useEffect(() => {
          const getUserListCollections =  async () => {
            try {
              const data = userInfo && await axiosInstance.get(`/users/${userInfo.username}/collections`);
              setUserCollections(data?.data)
              setErrorMessage('')
            } catch(e){
              setErrorMessage(e.massage)
            }
            }
            userInfo?.username && token && getUserListCollections()
        }, [userInfo])


  useEffect(() => {
    if(accessKey){
      window.open(
        window.location.href = `https://unsplash.com/oauth/authorize?client_id=${accessKey}&redirect_uri=${window.location.href}&response_type=code&scope=public+read_user+write_photos+write_collections+read_collections`,
        '_blank'
      );
      localStorage.setItem('accessKey', JSON.stringify(accessKey));
    }
  }, [accessKey])

  const {isToken, setIsToken } = useAuth(code, searchParams, setSearchParams) 

  const fetchFotos = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const result = url && (await axiosInstance.get(url));
      setData({ photos: result.data });
      setTotalPages(result.data.total_pages);
      setIsLoading(false);
    } catch (e) {
      setErrorMessage('Error fetching images');
    }
  };

  useEffect(() => {
    isToken && fetchFotos();
  }, [url, isToken]);

  const handleSearch = () => {
    setResultHeader(false);
    if (errMessage) {
      setQuery('animal');
      setErrorMessage('');
    }
  };

  const removeTokenHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessKey');
    localStorage.removeItem('user');
    setIsToken('');
    searchParams.delete('code');
    setSearchParams(searchParams);
  };

  const loginHandler = () => {
    const key = prompt('Enter your Access Key')
    setAccessKey(key)
  }


  return (
    <div className='appWrapper'>
   
    <header className='header'>

      <div className='header--auth'>
        {!isToken ? (
          <button onClick={loginHandler} >Login</button>
        ) : ( 
          <div className='header--auth-logged'>
            <button className='header--auth-logged-profile' onClick={() => navigate('/profile')} >Profile</button> 
            <button onClick={removeTokenHandler}>Log Out</button>
          </div>
          
         )} 
      </div>

      <div className='header--container'>
        {isResultHeader ? (
          <SearchResultHeader handleSearch={handleSearch} query={query} />
        ) : (
          <Input
            query={query}
            setQuery={setQuery}
          />
        )}
      </div>

      <div className='header--swith'>
        {width > 1440 && (
          <Switch
            isOn={toggleValue}
            toggleSwitchHandler={() => setToggleValue(!toggleValue)}
          />
        )}
      </div>
    </header>

    {!token && !errMessage ? (
      <h3>Please login to see collections</h3>
    ) : token && errMessage ? <h3>{errMessage}</h3> : (
      <List
        data={data}
        isLoading={isLoading}
        setShowModal={setShowModal}
        setPhotoDetails={setPhotoDetails}
        toggleValue={toggleValue}
        setToggleValue={setToggleValue}
      />
    )}
    {showModal && photoDetails && (
      <Modal
        userCollections={userCollections}
        photoDetails={photoDetails}
        setShowModal={setShowModal}
        setQuery={setQuery}
        setStatusHandler={setStatusHandler}
      />
    )}
    {token && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
  </div>
  );
};

export default MainSection;
