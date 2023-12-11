import React from 'react';
import '../styles/PetAdoption.css';

/* component that shows information about adopting a pet
  parameters: 
  returns: 
*/
const PetAdoption = () => {
  return (
    <div className="pet-adoption">
      <h1>How to Adopt a Pet</h1>
      <p>
        Adopting a pet is a wonderful and fulfilling experience. Here are some essential steps to consider when adopting a new furry friend:
      </p>
      <ol className="adopt-list">
        <li>Research Pet Adoption: Start by researching the different options for pet adoption, including animal shelters, rescue organizations, and breed-specific rescues.</li>
        <li>Assess Your Lifestyle: Consider your living situation, daily routine, and the time you can commit to a pet.</li>
        <li>Choose the Right Pet: Select a pet that matches your lifestyle, whether it's a dog, cat, or another type of animal.</li>
        <li>Visit Local Shelters: Visit nearby animal shelters and rescue organizations to meet potential pets.</li>
        <li>Ask Questions: When visiting shelters, ask questions about a pet's history, temperament, and any special needs.</li>
        <li>Consider Adoption Fees: Be prepared for adoption fees and ongoing costs related to pet ownership.</li>
        <li>Prepare Your Home: Make your home pet-friendly by removing hazards and obtaining necessary supplies.</li>
        <li>Complete Adoption Forms: Fill out adoption applications and provide the required references.</li>
        <li>Meet-and-Greet: Arrange a meeting with the pet to ensure compatibility with your family and lifestyle.</li>
        <li>Finalize the Adoption: Complete the necessary paperwork and pay any fees to bring your new pet home.</li>
      </ol>
      <p>
        Remember that adopting a pet is a lifelong commitment, and it's essential to provide love, care, and a safe environment for your new companion.
      </p>
      <p>
        For more detailed information on pet adoption, please visit organizations like Petfinder and your local animal shelters.
      </p>
    </div>
  );
};

export default PetAdoption;
