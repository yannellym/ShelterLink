import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/AdoptedAnimalsSection.css';

const AdoptedAnimalsSection = () => {
  const [recentlyAdoptedAnimals, setRecentlyAdoptedAnimals] = useState([]);

  useEffect(() => {
    const fetchAdoptedAnimals = async () => {
      try {
        const response = await fetch('https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/adopted_pets?status=adopted');
        const dataRaw = await response.json();
        const stringData = JSON.stringify(dataRaw);
        const parsedData = JSON.parse(stringData);
        const petData = JSON.parse(parsedData.body);
        console.log(petData, "data in adopted")
        setRecentlyAdoptedAnimals(petData.animals);
      } catch (error) {
        console.error('Error fetching adopted animals:', error);
      }
    };

    fetchAdoptedAnimals();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Set the number of slides to show at once
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
  };

  return (
    <div className="adopted-animals-container">
      <h3>Recently Adopted Animals:</h3>
      <Slider {...settings}>
        {recentlyAdoptedAnimals?.map((adoptedAnimal) => (
          adoptedAnimal.photos.length > 0 && (
            <div key={adoptedAnimal.id} className="adopted-animal-card">
              {/* Add the adopted label */}
              <div className="adopted-label">Adopted!</div>
              {/* Render the image */}
              <img src={adoptedAnimal.photos[0].medium} alt={adoptedAnimal.name} />
              {/* Render other information */}
              <p>Name: {adoptedAnimal.name}</p>
              <p>Date Adopted: {new Date(adoptedAnimal.status_changed_at).toLocaleDateString()}</p>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};


export default AdoptedAnimalsSection;
