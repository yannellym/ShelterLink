// DogList.js
import React from 'react';
import '../styles/DogList.css'; 


function DogList({ dogs }) {
  return (
    <div className="dog-list">
      {dogs.map(dog => (
        <div key={dog.id} className="dog-card">
          <img src={dog.photo} alt={dog.name} />
          <h3>{dog.name}</h3>
          <p>Breed: {dog.breed}</p>
          {/* Add more dog details */}
        </div>
      ))}
    </div>
  );
}

export default DogList;
