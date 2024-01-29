import React from 'react';
import '../styles/PetFoster.css';

const PetFoster = () => {
  return (
    <div className="pet-foster">
      <h1>How to Foster a Pet</h1>
      <p>
        Fostering a pet is a wonderful and fulfilling experience. Here are some essential steps to consider when adopting a new furry friend:
      </p>
      <ol className="foster-list">
        <li>
          <h3>What is Fostering?</h3>
          Fostering involves taking care of a pet (usually a cat or dog) for a predetermined period. This could range from a few weeks to several months. You provide love, shelter, and attention to the animal while they await their forever home.
        </li>
        <li>
          <h3>Why Foster a Pet?</h3>
          Fostering helps shelters and rescues free up space for more animals. It provides temporary relief for pets, especially those who are sick, injured, or too young to be adopted. It also allows potential adopters to learn more about the pet's personality.
        </li>
        <li>
          <h3>What Are Your Responsibilities?</h3>
          As a foster, you'll be responsible for the pet's daily care, including feeding, grooming, exercise, and socialization. You may need to administer medication or attend vet appointments. Most importantly, you'll provide love and a safe environment.
        </li>
        <li>
          <h3>How to Get Started</h3>
          To become a foster, reach out to your local animal shelter or rescue group. They'll guide you through the application process and provide training if necessary. They'll match you with a pet based on your preferences and availability.
        </li>
      </ol>
      <p>
        Fostering is a rewarding experience that saves lives and helps animals find loving homes. If you're passionate about animals, consider becoming a foster and make a difference in their lives.
      </p>
      <h2>Additional Resources:</h2>
      <ul className="resources-list">
        <li>
          <a href="https://www.aspcapro.org/adoption-placement/foster-care" target="_blank" rel="noopener noreferrer">ASPCA Fostering Guide</a>
        </li>
        <li>
          <a href="https://resources.bestfriends.org/best-friends-animal-society-resource-center" target="_blank" rel="noopener noreferrer">Best Friends Animal Society - Foster Resource Center</a>
        </li>
        <li>
          <a href="https://www.petfinder.com/cats/bringing-a-cat-home/how-to-foster-kittens/" target="_blank" rel="noopener noreferrer">Petfinder - About Adoption </a>
        </li>
      </ul>
    </div>
  );
};

export default PetFoster;
