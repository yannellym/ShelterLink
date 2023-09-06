import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesPage.css';
import PetCard from './PetCard';

function FavoritesPage({ favoritePets, removeFromFavorites }) {
  return (
    <div className="pet-card-container">
      <div className="title-container">
        <h1>Favorite Pets 🐾 </h1>
      </div>
      {favoritePets.length === 0 ? (
        <div className="message-container">
          <img src="/images/sadlab.jpg" alt="Sad Lab" className="sad-lab-image" />
          <div className="message">
            <h2>Uh oh, no pets have been favorited yet.</h2>
            <p>
              Click <Link to="/find-a-pet" className="link">HERE</Link> to find your next companion 🦴🧶.
            </p>
          </div>
        </div>
      ) : (
        <div className="pet-card-list">
          {favoritePets.map((pet) => (
            <PetCard key={pet.id} pet={pet} removeFromFavorites={removeFromFavorites} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
