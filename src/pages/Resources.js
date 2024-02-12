import React from 'react';
import '../styles/Resources.css';

/* component to display resources for the user
  parameters: 
  returns: 
*/
const Resources = () => {
  const resources = [
    {
      title: 'Adoption Information',
      description: 'Learn about the adoption process and requirements.',
      image: 'dog2.jpg',
      link: 'https://www.petfinder.com/adopt-or-get-involved/adopting-pets/'
    },
    {
      title: 'Pet Care Tips',
      description: 'Get advice on caring for your new furry friend.',
      image: 'dogs1.jpg',
      link: 'https://www.alouetteanimalhospital.ca/10-pet-care-tips/'
    },
    {
      title: 'Foster Information',
      description: 'Learn all about fostering.',
      image: 'dog.jpg',
      link: '/pet-foster'
    },
    {
      title: 'Train Your Pets',
      description: 'Learn how to properly train your pets',
      image: 'both.jpg',
      link: '/pet-training'
    },
  ];

  return (
    <div>
      <h1>Resources</h1>
      <div className="resources-container">
      {resources.map((resource, index) => (
        <a key={index} href={resource.link} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer" className={`resource ${index % 2 === 0 ? 'resource-left' : 'resource-right'}`}>
          <img
            src={require(`../images/${resource.image}`)}
            alt={`Dog ${index + 1}`}
            className="resource-image"
          />
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
        </a>
      ))}
      </div>
    </div>
  );
};

export default Resources;