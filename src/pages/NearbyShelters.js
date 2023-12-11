import React from 'react';
import useNearbyShelters from '../hooks/useNearbyShelters';
import { useLocation } from 'react-router-dom';
import '../styles/NearbyShelters.css'; 
import animal_shelter from '../images/animal_shelter.jpg'

const SheltersNearbyPage = () => {
  // get location of the user
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userLocation = {
    latitude: queryParams.get('latitude'),
    longitude: queryParams.get('longitude'),
  };
  // fetch nearby shelters based on user's selected location
  const { shelters, loading, error } = useNearbyShelters({userLocation});

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
            <li><strong>Shelter's Name: </strong>{shelter.name}</li>
            <li><strong>Email:</strong>{shelter.email}</li>
            <li><strong>Phone: </strong>{shelter.phone}</li>
            <li><strong>Website: </strong>{shelter.website}</li>
            <li><strong>Distance from you:</strong> {shelter.distance} miles</li>
            {shelter.social_media && (
              <React.Fragment>
                <li><strong>Facebook </strong>{shelter.social_media.facebook || 'N/A'}</li>
                <li><strong>Instagram </strong>{shelter.social_media.instagram || 'N/A'}</li>
              </React.Fragment>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SheltersNearbyPage;
