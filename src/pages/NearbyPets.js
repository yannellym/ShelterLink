import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NearbyPetsPage.css';
import PetCard from '../components/PetCard';

function NearbyPets() {
  const { state: { userLocation } } = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    count_per_page: 25,
  });
  const buttonsToShow = 9;

  useEffect(() => {
    const fetchNearbyPets = async (page) => {
      try {
        setLoading(true);
        // Make your API request here using the user location and current page
        const response = await fetch(`https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/nearby_pets?location=${userLocation.zipCode}&limit=25&page=${page}`);
        const responseData = await response.json(); // Parse the outer JSON string
        const apiData = JSON.parse(responseData.body); // Parse the inner JSON string
        console.log(apiData, "data");

        // Update state with new data and pagination information
        setData(apiData.animals || []);
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

    // Fetch data when the component mounts
    fetchNearbyPets(pagination.current_page);
  }, [userLocation, pagination.current_page]);

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
      <h2>Nearby Pets in {userLocation.zipCode}</h2>
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
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
            >
              Previous
            </button>
            {generatePageButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={pagination.current_page === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.total_pages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPets;
