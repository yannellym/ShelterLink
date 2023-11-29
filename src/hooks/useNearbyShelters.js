import { useState, useEffect } from 'react';

const useNearbyShelters = ({ userLocation }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(userLocation, "userLocation in hook");

    const fetchData = async () => {
      try {
        const apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_shelters?location=${userLocation.latitude},${userLocation.longitude}`;
        const response = await fetch(apiUrl);
        const responseData = await response.json(); // Parse the outer JSON string
        const data = JSON.parse(responseData.body); // Parse the inner JSON string
        setShelters(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Only fetch data when userLocation changes
    if (userLocation) {
      fetchData();
    }
  }, []); // Include userLocation in the dependency array

  return { shelters, loading, error };
};

export default useNearbyShelters;
