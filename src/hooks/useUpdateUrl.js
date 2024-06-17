import { useEffect, useState } from 'react';

export default function useUpdateUrl(
  page,
  debouncedQueryValue,
  setResultHeader
) {
  const IMAGES_PER_PAGE = 10;

  let chackByEmptyString = debouncedQueryValue;

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (debouncedQueryValue === '') {
      chackByEmptyString = 'animal';
      setUrl(
        `/search/photos/?page=${page}&per_page=${IMAGES_PER_PAGE}&query=${chackByEmptyString}`
      );
    } else {
      setResultHeader(true);
      setUrl(
        `/search/photos/?page=${page}&per_page=${IMAGES_PER_PAGE}&query=${chackByEmptyString}`
      );
    }
  }, [page, debouncedQueryValue, setResultHeader]);

  return { url };
}
