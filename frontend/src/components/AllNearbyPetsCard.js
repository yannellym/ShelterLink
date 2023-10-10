import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/AllNearbyPetsCard.css';

function AllNearbyPetsCard({ imageSrc, name }) {
  return (
    <Link to="/find-a-pet" className="all-pets-card"> 
      <img width="64" height="64" src="https://img.icons8.com/sf-black/64/right.png" alt="right" />
      <p>View all available pets near you.</p>
    </Link>
  );
}

export default AllNearbyPetsCard;
