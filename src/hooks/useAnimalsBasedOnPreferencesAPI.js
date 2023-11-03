import { useState } from 'react';

const useAnimalsBasedOnPreferencesAPI = () => {
  // Define state variables to store preferred animals and loading state
  const [preferredAnimals, setPreferredAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Define an asynchronous function to fetch animals based on user preferences
  const fetchAnimalsBasedOnPreferences = async (preferences) => {
    try {
      // Initialize variables to store filtered animals and API call count
      let filteredAnimals = [];
      let apiCallsMade = 0;

      // Set loading to true to indicate that a fetch operation is in progress
      setLoading(true);

      // Perform API requests while the maximum number of calls is not reached and no matching animals are found
      while (apiCallsMade < 2 && filteredAnimals.length === 0) {
        // Determine the gender and size based on preferences or use defaults
        const gender = preferences.gender !== 'any' ? preferences.gender : 'Male';
        const size = preferences.size !== 'any' ? preferences.size : 'Large';

        // Construct the API URL with user preferences
        const apiUrl = `http://localhost:3002/api/petfinder?perPage=100&type=${preferences.type}&gender=${gender}&age=${preferences.age}&size=${size}`;

        // Send a GET request to the API and parse the response as JSON
        const response = await fetch(apiUrl);
        const prefdata = await response.json();

        // If response contains animals, filter them based on temperament preferences
        if (prefdata && prefdata.animals) {
          filteredAnimals = prefdata.animals.filter((animal) => {
            // Check if any temperament preference matches the animal's tags
            const matchesTags = preferences.temperament.some((prefTemperament) =>
              animal.tags.includes(prefTemperament)
            );
            return matchesTags || preferences.temperament.length === 0;
          });

          if (filteredAnimals.length === 0) {
            apiCallsMade++;
          }
        }
      }

      // If no matching animals are found, try a fallback API request with a single result
      if (filteredAnimals.length === 0) {
        const type = preferences.type;
        const gender = preferences.gender !== 'any' ? preferences.gender : 'Male';
        const fallbackApiUrl = `http://localhost:3002/api/petfinder?perPage=1&type=${type}&gender=${gender}`;

        const response = await fetch(fallbackApiUrl);
        const animalData = await response.json();

        if (animalData && animalData.animals && animalData.animals.length > 0) {
          const matchedAnimal = animalData.animals[0];
          filteredAnimals.push(matchedAnimal);
        } else {
          console.log("No matching animal found based on type and gender or age.");
        }
      }

      // Set the preferred animals state variable with the filtered results
      setPreferredAnimals(filteredAnimals);
    } catch (error) {
      // Handle errors by logging them
      console.error('Error fetching pet data:', error);
    } finally {
      // Set loading back to false to indicate that the fetch operation is completed
      setLoading(false);
    }
  };

  // Return the state variables and the fetch function for use in components
  return {
    preferredAnimals, // State variable for preferredAnimals
    loading, // State variable for loading
    fetchAnimalsBasedOnPreferences, // Function for fetching animals based on preferences
  };
};

export default useAnimalsBasedOnPreferencesAPI;
