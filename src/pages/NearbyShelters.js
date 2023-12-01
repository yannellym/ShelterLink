import React from 'react';
import useNearbyShelters from '../hooks/useNearbyShelters';
import { useLocation } from 'react-router-dom';
import '../styles/NearbyShelters.css'; 
import animal_shelter from '../images/animal_shelter.jpg'

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
    return <p className="error-message">Error fetching data: {error.message}</p>;
  }

  return (
    <div className="container">
      <h1>Shelters Nearby</h1>
      {shelters?.organizations && shelters.organizations.map((shelter, index) => (
        <div key={index} className="card">
         <img
            src={shelter.photos?.length > 0 ? shelter.photos[0]?.full || shelter.photos[0]?.medium : animal_shelter}
            alt={`Shelter ${index}`}
          />
          <ul>
            <li>Shelter Name: {shelter.name}</li>
            <li>Shelter Email: {shelter.email}</li>
            <li>Shelter Phone: {shelter.phone}</li>
            <li>Shelter website: {shelter.website}</li>
            <li>Shelter distance from you: {shelter.distance} miles</li>
            {shelter.social_media && (
              <React.Fragment>
                <li>Facebook {shelter.social_media.facebook || 'N/A'}</li>
                <li>Instagram {shelter.social_media.instagram || 'N/A'}</li>
              </React.Fragment>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SheltersNearbyPage;
