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
        const response = await fetch('https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/adopted_pets?status=adopted&limit=100');
        const dataRaw = await response.json();
        const stringData = JSON.stringify(dataRaw);
        const parsedData = JSON.parse(stringData);
        const petData = JSON.parse(parsedData.body);
        console.log(petData);
        setRecentlyAdoptedAnimals(petData.animals);
      } catch (error) {
        console.error('Error fetching adopted animals:', error);
      }
    };

    fetchAdoptedAnimals();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, recentlyAdoptedAnimals.length),
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
  };

  return (
    <div className="adopted-animals-container">
      <h2>Recently Adopted Animals:</h2>
      <Slider {...settings}>
        {recentlyAdoptedAnimals.map((adoptedAnimal, index) => (
          adoptedAnimal.photos.length > 0 && (
            <div key={adoptedAnimal.id && adoptedAnimal.organization_animal_id} className="adopted-animal-card">
              {/* adopted label */}
              <div className="adopted-label">Adopted ❤️ </div>
              {/* the image */}
              <img src={adoptedAnimal.photos[0].medium} alt={adoptedAnimal.name} />
              {/* other information */}
              <p>Name: <span className="red-text">{adoptedAnimal.name}</span></p>
              <p>Adopted in 
                <span className="red-text"> {adoptedAnimal.contact.address.city}, {adoptedAnimal.contact.address.state} </span>
                on 
                <span className="red-text"> {new Date(adoptedAnimal.status_changed_at).toLocaleDateString()}</span>
              </p>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};


export default AdoptedAnimalsSection;