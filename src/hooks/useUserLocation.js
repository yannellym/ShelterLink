// src/hooks/useUserLocation.js

import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        setLoading(true);

        // Fetch user's current position
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
        });

        const { latitude, longitude } = position.coords;

        // Use reverse geocoding to get the ZIP code
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDNZzuD8O2UcYuQpL58TAAceGgUaUW71GM`);
        const data = await response.json();
        const zipCode = data.results[0]?.address_components.find(
          (component) => component.types.includes('postal_code')
        )?.short_name;

        // Update the userLocation state
        setUserLocation({ latitude, longitude, zipCode });
      } catch (error) {
        console.error('Error getting user location:', error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the user location when the component mounts
    fetchUserLocation();
  }, []);

  return { userLocation, loading, error };
};

export default useUserLocation;