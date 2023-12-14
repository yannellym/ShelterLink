import React, { useState, useEffect } from 'react';
import useNearbyShelters from '../hooks/useNearbyShelters';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/NearbyShelters.css';
import animal_shelter from '../images/animal_shelter.jpg';

const SheltersNearbyPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userLocation = {
    latitude: queryParams.get('latitude'),
    longitude: queryParams.get('longitude'),
    zipCode: queryParams.get('zipCode'),
  };
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    count_per_page: 24,
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [zipCode, setZipCode] = useState('');

  const fetchNearbySheltersForCurrentPage = async (page) => {
    try {
      setLoading(true);

      const response = await fetch(
        userLocation.zipCode
          ? `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_shelters?location=${userLocation.zipCode}&limit=${pagination.count_per_page}&page=${page}`
          : `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_shelters?location=75070&limit=${pagination.count_per_page}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const responseData = await response.json();
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbySheltersForCurrentPage(currentPage);
  }, [currentPage]);

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
      <h1 className="title">Shelters Nearby {userLocation.zipCode} </h1>
      {userLocation.zipCode ? (
        <div className="grid-container">
          {loading ? (
            <p>Loading...</p>
          ) : data? (
            data.map((shelter, index) => (
              <div key={index} className="card">
                <img
                  src={
                    shelter.photos?.length > 0
                      ? shelter.photos[0]?.full || shelter.photos[0]?.medium
                      : animal_shelter
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
                      "N/A"
                    )}
                  </li>
                  <li>
                  <strong>Phone: </strong>
                    {shelter.phone ? (
                      <a href={`tel:${shelter.phone}`}>{shelter.phone}</a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Website: </strong>
                    {shelter.website ? (
                      <a href={shelter.website} target="_blank" rel="noreferrer">
                        {formatSocialMediaLink(shelter.website)}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li className="distance">
                    <strong>Distance from you:</strong>{' '}
                    <span className="red-text">{shelter.distance.toFixed(1)} miles</span>
                  </li>
                  {shelter.social_media && (
                    <React.Fragment>
                      <li>
                        <strong>Facebook: </strong>
                        {shelter.social_media.facebook ? (
                          <a href={shelter.social_media.facebook} target="_blank" rel="noreferrer">
                            {formatSocialMediaLink(shelter.social_media.facebook)}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </li>
                      <li>
                        <strong>Instagram: </strong>
                        {shelter.social_media.instagram ? (
                          <a href={shelter.social_media.instagram} target="_blank" rel="noreferrer">
                            {formatSocialMediaLink(shelter.social_media.instagram)}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </div>
            ))
          ) : (
              <p>No location was shared. Please share location and try again.</p>
          )}
        </div>
      ) : (
        <div className="zip-code-input">
          <label htmlFor="zipCode">Enter Your Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <button onClick={''}>Submit</button>
        </div>
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