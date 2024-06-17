import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useAuth(code, searchParams, setSearchParams) {
 
    const [isToken, setIsToken] = useState(
        JSON.parse(localStorage.getItem('token')) || ''
      );

      useEffect(() => {

    const getToken = async () => {
      const { data } = await axios.post(
        'https://unsplash.com/oauth/token',
        {
          client_id: JSON.parse(localStorage.getItem('accessKey')),
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          redirect_uri: window.location.href,
          code: code,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('token', JSON.stringify(data.access_token));
      setIsToken(JSON.stringify(data.access_token));
      searchParams.delete('code');
      setSearchParams(searchParams);
    };

    code && !isToken && getToken();

      }, [code, isToken])

      return {isToken, setIsToken };

}
