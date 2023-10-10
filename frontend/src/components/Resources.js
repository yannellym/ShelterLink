import React from 'react';
import '../styles/Resources.css';

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
      title: 'Local Shelters',
      description: 'Find shelters and rescues near you.',
      image: 'dog.jpg',
      link: 'https://www.google.com/search?q=animal+shelters+near+me&sca_esv=572280770&sxsrf=AM9HkKlxuAD2GjmPPBX4r_1lHGwfbdLmpA%3A1696961336649&ei=OJMlZa2EJ_yoqtsP5fCDsAI&ved=0ahUKEwitgKzNieyBAxV8lGoFHWX4ACYQ4dUDCBA&uact=5&oq=animal+shelters+near+me&gs_lp=Egxnd3Mtd2l6LXNlcnAiF2FuaW1hbCBzaGVsdGVycyBuZWFyIG1lMggQABiKBRiRAjIIEAAYigUYkQIyCBAAGIoFGJECMgUQABiABDIGEAAYBxgeMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIIEAAYgAQYsQNItiBQAFiUH3AAeAGQAQCYAWqgAfYHqgEDOC4zuAEDyAEA-AEBwgIHEAAYgAQYCsICCBAAGAcYHhgKwgILEAAYBxgeGPEEGArCAgcQABgNGIAEwgIIEAAYBRgeGA3iAwQYACBBiAYB&sclient=gws-wiz-serp'
    },
  ];

  return (
    <div className="resources-container">
      <h1>Resources</h1>
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
  );
};

export default Resources;
