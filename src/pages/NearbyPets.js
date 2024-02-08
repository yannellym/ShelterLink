import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NearbyPetsPage.css';
import PetCard from '../components/PetCard';


function NearbyPets() {
  const { state: { fetchedUserLocation } } = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    count_per_page: 24,
  });
  const buttonsToShow = 9;
  console.log(fetchedUserLocation, "loc received in pets_nearby")
  useEffect(() => {
    const fetchNearbyPets = async (page) => {
      try {
        setLoading(true);
        let apiUrl = null;
        console.log(" location in ")
        // Check if fetchedUserLocation is an object with latitude and longitude
        if (fetchedUserLocation && fetchedUserLocation.latitude && fetchedUserLocation.longitude) {
          apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_pets?location=${fetchedUserLocation.latitude},${fetchedUserLocation.longitude}&limit=${pagination.count_per_page}&page=${page}`;
        } else if (fetchedUserLocation && fetchedUserLocation.zipCode) {
          // Check if fetchedUserLocation is an object with zipCode
          apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_pets?location=${fetchedUserLocation.zipCode}&limit=${pagination.count_per_page}&page=${page}`;
        } else {
          // Handle the case where fetchedUserLocation is not structured as expected
          console.error('Invalid fetchedUserLocation object:', fetchedUserLocation);
          return;
        }
  
        // Make your API request using the constructed apiUrl
        const response = await fetch(apiUrl);
        
        if (!response) {
          console.error('No location information available for API call');
        }
        const responseData = await response.json(); // Parse the outer JSON string
        const apiData = JSON.parse(responseData.body); // Parse the inner JSON string

        // Update state with new data and pagination information
        setData(apiData.animals || []);
        setPagination({
          current_page: apiData.pagination.current_page,
          total_pages: apiData.pagination.total_pages,
          count_per_page: apiData.pagination.count_per_page,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        // setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when the component mounts
    fetchNearbyPets(pagination.current_page);
  }, [fetchedUserLocation, pagination.current_page]);

  const handlePageChange = (newPage) => {
    // Update the current page and trigger a new data fetch
    setPagination((prevPagination) => ({
      ...prevPagination,
      current_page: newPage,
    }));
  };

  const generatePageButtons = () => {
    const startPage = Math.max(1, pagination.current_page - Math.floor(buttonsToShow / 2));
    const endPage = Math.min(pagination.total_pages, startPage + buttonsToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="nearby-pets-component">
      <h2>Nearby Pets in {fetchedUserLocation.zipCode || fetchedUserLocation}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="pet-list">
            {data.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
          <div className="pagination">
            {generatePageButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pets-near-btn ${pagination.current_page === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPets;