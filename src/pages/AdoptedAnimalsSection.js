import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/AdoptedAnimalsSection.css';
import coming_soon from "../images/coming_soon.png";
const AdoptedAnimalsSection = () => {
  const [recentlyAdoptedAnimals, setRecentlyAdoptedAnimals] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchAdoptedAnimals = async () => {
      try {
        const response = await fetch('https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/adopted_pets?status=adopted&limit=50');
        const dataRaw = await response.json();
        const stringData = JSON.stringify(dataRaw);
        const parsedData = JSON.parse(stringData);
        const petData = JSON.parse(parsedData.body);
        console.log(petData, "PET DAT RECIED NOW")
        // Choose 20 animals
        const selectedAnimals = petData.animals.slice(0, 20);

        // Check for photos and set a placeholder image if needed
        const animalsWithImages = await Promise.all(
          selectedAnimals.map(async (animal) => {
            if (animal.photos && animal.photos.length > 0) {
              return animal;
            } else {
              return {
                ...animal,
                photos: [
                  {
                    medium: await fetchPlaceholderImage(animal.type, animal.breeds.primary),
                  },
                ],
              };
            }
          })
        );

        setRecentlyAdoptedAnimals(animalsWithImages || []);
      } catch (error) {
        console.error('Error fetching adopted animals:', error);
        setError(true);
      }
    };

    fetchAdoptedAnimals();
  }, []);

  const fetchPlaceholderImage = async (type, breed) => {
    try {
      const response = await fetch(`https://source.unsplash.com/200x200/?${type},${breed}`);
      if (response.ok) {
        return response.url;
      }
      // Return the placeholder image if the request fails
      return coming_soon;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return coming_soon;
    }
  };


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, recentlyAdoptedAnimals?.length) || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
 
  return (
    <div className="adopted-animals-container">
      {error ? null  : (
        <>
          <h2>Recently Adopted Animals:</h2>
          {recentlyAdoptedAnimals && recentlyAdoptedAnimals.length > 0 && (
            <Slider {...settings}>
              {recentlyAdoptedAnimals.map((adoptedAnimal, index) => (
                adoptedAnimal.photos && adoptedAnimal.photos.length > 0 && (
                  <div key={adoptedAnimal.id && adoptedAnimal.organization_animal_id} className="adopted-animal-card">
                    <div className="adopted-label">Adopted ❤️ </div>
                    <div className="image-container">
                      <img src={adoptedAnimal.photos[0].medium} alt={adoptedAnimal.name} />
                      <div className="text-container">
                        <p>Name: <span className="red-text">{adoptedAnimal.name}</span></p>
                        <p>Adopted in 
                          <span className="red-text"> {adoptedAnimal.contact.address.city}, {adoptedAnimal.contact.address.state} </span>
                          on 
                          <span className="red-text"> {new Date(adoptedAnimal.status_changed_at).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  );
};
    

export default AdoptedAnimalsSection;
