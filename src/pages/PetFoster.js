import React from 'react';
import '../styles/PetFoster.css';

/* component that shows information about fostering a pet
  parameters: 
  returns: 
*/
const PetFoster = () => {
  return (
    <div className="pet-foster">
      <h1>How to Foster a Pet</h1>
      <p>
        Fostering a pet is a wonderful and fulfilling experience. Here are some essential steps to consider when adopting a new furry friend:
      </p>
      <ol className="foster-list">
        <li>
          <h3>What is Fostering?</h3>Fostering involves taking care of a pet (usually a cat or dog) for a predetermined period. This could range from a few weeks to several months. You provide love, shelter, and attention to the animal while they await their forever home.
        </li>
        <li>
          <h3>Why Foster a Pet?</h3>Fostering helps shelters and rescues free up space for more animals. It provides temporary relief for pets, especially those who are sick, injured, or too young to be adopted. It also allows potential adopters to learn more about the pet's personality.
        </li>
        <li>
          <h3>What Are Your Responsibilities?</h3>As a foster, you'll be responsible for the pet's daily care, including feeding, grooming, exercise, and socialization. You may need to administer medication or attend vet appointments. Most importantly, you'll provide love and a safe environment.
        </li>
        <li>
          <h3>How to Get Started</h3>To become a foster, reach out to your local animal shelter or rescue group. They'll guide you through the application process and provide training if necessary. They'll match you with a pet based on your preferences and availability.
        </li>
      <p>
        Fostering is a rewarding experience that saves lives and helps animals find loving homes. If you're passionate about animals, consider becoming a foster and make a difference in their lives.
      </p>
      </ol>
    </div>
  );
};

export default PetFoster;
