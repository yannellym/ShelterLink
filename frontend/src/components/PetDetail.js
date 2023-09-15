import React from 'react';

function PetDetail({ pet }) {
  return (
    <div className="pet-detail">
      <h2>{pet.name}</h2>
      <img src={pet.image} alt={pet.name} />
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Size: {pet.size}</p>
      {/* Add more pet details here */}
    </div>
  );
}

export default PetDetail;
