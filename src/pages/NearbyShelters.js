import React from 'react';
import useNearbyShelters from '../hooks/useNearbyShelters';
import { useLocation } from 'react-router-dom';

const SheltersNearbyPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userLocation = {
    latitude: queryParams.get('latitude'),
    longitude: queryParams.get('longitude'),
  };
  // console.log(userLocation, "user loc in nearbypage");

    // console.log("Before useNearbyShelters:", userLocation);
    const { shelters, loading, error } = useNearbyShelters({userLocation});
    console.log(shelters, "shelters")
      console.log("Type of Shelters:", typeof shelters);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h1>Shelters Nearby</h1>
      {shelters.animals && shelters.animals.map((shelter, index) => (
        <ul key={index}>
          <li>Shelter ID: {shelter.organization_id}</li>
          {shelter.contact && (
            <React.Fragment>
              <li>Address: {shelter.contact.address?.address1 || 'N/A'}</li>
              <li>Email: {shelter.contact.email || 'N/A'}</li>
              <li>Phone: {shelter.contact.phone || 'N/A'}</li>
            </React.Fragment>
          )}
        </ul>
      ))}
    </div>
  );
};

export default SheltersNearbyPage;
