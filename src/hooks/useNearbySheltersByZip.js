import { useState, useEffect } from 'react';

const useNearbySheltersByZip = ({ userLocation, page, limit}) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(userLocation)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_shelters?location=${userLocation}&page=${page}&limit=${limit}`;
        const response = await fetch(apiUrl);
        const responseData = await response.json(); // Parse the outer JSON string
        const data = JSON.parse(responseData.body); // Parse the inner JSON string
        console.log(data, "res")
        // set our shelters data
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
  }, []);
  return { shelters, loading, error };
};

export default useNearbySheltersByZip;
