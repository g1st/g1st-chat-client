import { useEffect, useState } from 'react';

const useFetch = (url, refetchTime, deps) => {
  const [state, setState] = useState({
    status: 'loading',
    error: null,
    data: null,
  });

  useEffect(() => {
    let isActive = true;
    const getData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (isActive) {
            setState({ status: 'success', error: null, data: data.data });
          }
        })
        .catch((err) => setState({ status: 'error', error: err, data: null }));
    };
    getData();

    let interval;
    if (refetchTime) {
      // fetch for new data every refetchTime seconds
      interval = setInterval(getData, refetchTime);
    }

    return () => {
      isActive = false;
      if (refetchTime) {
        clearInterval(interval);
      }
    };
  }, [url, refetchTime, deps]);

  return [state, setState];
};

export default useFetch;
