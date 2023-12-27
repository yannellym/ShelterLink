import React, { useState, useEffect } from 'react';
import '../styles/NearbyShelters.css';
import animal_shelter from '../images/animal_shelter.jpg';
import { useLocation } from 'react-router-dom';

const SheltersNearbyPage = ({ userLocation }) => {
  const location = useLocation();
  console.log(location, "location state");

  // Prioritize the ZIP code from the state object
  const passedInLocation = location.state?.fetchedUserLocation?.zipCode || new URLSearchParams(location.search).get('zipCode');
  console.log(passedInLocation, "passedInLocation");

  useEffect(() => {
    console.log('Zip Code:', passedInLocation);
  }, [passedInLocation]);

  const [newUserLocation, setUserLocation] = useState(null);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    count_per_page: 24,
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const locationToUse = passedInLocation || (userLocation && userLocation.zipCode) || '11208';

  useEffect(() => {
    // Update the user location state when it's fetched
    if (userLocation) {
      setUserLocation(userLocation.zipCode);
    }
  }, [userLocation]);

  const fetchNearbySheltersForCurrentPage = async (page) => {
    try {
      setLoading(true);
      console.log("calling api with loc", locationToUse);

      const response = await fetch(
        `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_shelters?location=${locationToUse}&limit=${pagination.count_per_page}&page=${page}`
      );
        console.log(response, "RESPONSE")
      if (!response.ok) {
        console.log("error of api", response.status);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData, "response data")
      const apiData = JSON.parse(responseData.body);

      console.log(apiData, "data received");
      setData(apiData.organizations || []);
      setPagination({
        current_page: apiData.pagination.current_page,
        total_pages: apiData.pagination.total_pages,
        count_per_page: apiData.pagination.count_per_page,
      });
    } catch (error) {
      setError(error);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch nearby shelters only if the user location is available
    if (locationToUse !== '11208') {
      console.log("calling shelters");
      fetchNearbySheltersForCurrentPage(currentPage);
    }
  }, [locationToUse, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setCurrentPage(newPage);
      fetchNearbySheltersForCurrentPage(newPage);
    }
  };

  const formatSocialMediaLink = (link) => {
    return link.length > 30 ? (
      <>
        {link.substring(0, 30)}
        <br />
        {link.substring(30)}
      </>
    ) : link;
  };

  const totalPages = pagination.total_pages || 0;

  const startPage = Math.max(1, Math.min(currentPage - 4, totalPages - 8));
  const endPage = Math.min(totalPages, startPage + 8);

  const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div>
      <h1 className="title">Shelters Nearby {newUserLocation || locationToUse}</h1>
      {newUserLocation || locationToUse !== '11208' ? (
        <div className="grid-container">
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            data.map((shelter, index) => (
              <div key={index} className="card">
                <img
                  src={
                    shelter.photos?.length > 0
                      ? shelter.photos[0]?.full || shelter.photos[0]?.medium
                      : { animal_shelter }
                  }
                  alt={`Shelter ${index}`}
                />
                <ul>
                  <li>
                    <strong>Shelter's Name: </strong>
                    {shelter.name}
                  </li>
                  <li>
                    <strong>Email: </strong>
                    {shelter.email ? (
                      <a href={`mailto:${shelter.email}`}>{shelter.email}</a>
                    ) : (
                      'N/A'
                    )}
                  </li>
                  <li>
                    <strong>Phone: </strong>
                    {shelter.phone ? (
                      <a href={`tel:${shelter.phone}`}>{shelter.phone}</a>
                    ) : (
                      'N/A'
                    )}
                  </li>
                  <li>
                    <strong>Website: </strong>
                    {shelter.website ? (
                      <a href={shelter.website} target="_blank" rel="noreferrer">
                        {formatSocialMediaLink(shelter.website)}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </li>
                  <li className="distance">
                    <strong>Distance from you:</strong>{' '}
                    <span className="red-text">{shelter.distance.toFixed(1)} miles</span>
                  </li>
                  {shelter.social_media && (
                    <>
                      <li>
                        <strong>Facebook: </strong>
                        {shelter.social_media.facebook ? (
                          <a href={shelter.social_media.facebook} target="_blank" rel="noreferrer">
                            {formatSocialMediaLink(shelter.social_media.facebook)}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </li>
                      <li>
                        <strong>Instagram: </strong>
                        {shelter.social_media.instagram ? (
                          <a href={shelter.social_media.instagram} target="_blank" rel="noreferrer">
                            {formatSocialMediaLink(shelter.social_media.instagram)}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No location was shared. Please share location and try again.</p>
          )}
        </div>
      ) : (
        <p>No location was shared. Please share location and try again.</p>
      )}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SheltersNearbyPage;
