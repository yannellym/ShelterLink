import { useState, useEffect } from 'react';

const usePetFinderAPI = (url, dependencies) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let responseText = null;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.log( Error, "api error")
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Read and log the raw response text
        responseText = await response.text();
        // parse the response 
        const result = JSON.parse(responseText);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, dependencies);
  return { data, loading };
};

export default usePetFinderAPI;
