import { useState } from 'react';

const useAnimalsBasedOnPreferencesAPI = () => {
  const [preferredAnimals, setPreferredAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnimalsWithRetry = async (preferences, attemptsLeft = 5) => {
    try {
      if (attemptsLeft === 0) {
        console.error("No matching animal found after 5 attempts.");
        return;
      }

      const gender = preferences.gender !== 'any' ? preferences.gender : 'Male';
      const size = preferences.size !== 'any' ? preferences.size : 'Large';

      const apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_match?perPage=100&type=${preferences.type}&gender=${gender}&age=${preferences.age}&size=${size}`;
      console.log(apiUrl);

      const response = await fetch(apiUrl);
      const prefdata = await response.json();
      console.log(prefdata);

      let filteredAnimals = [];

      if (prefdata && prefdata.animals) {
        filteredAnimals = prefdata.animals.filter((animal) => {
          const matchesTags = preferences.temperament.some((prefTemperament) =>
            animal.tags.includes(prefTemperament)
          );
          return matchesTags || preferences.temperament.length === 0;
        });
      }

      if (filteredAnimals.length === 0) {
        // Retry with a delay using recursion
        const delay = 1000 * Math.pow(2, 5 - attemptsLeft); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        await fetchAnimalsWithRetry(preferences, attemptsLeft - 1);
      } else {
        // Set the preferred animals state variable with the filtered results
        setPreferredAnimals(filteredAnimals);
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
      // Handle errors in your UI or provide user feedback
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimalsBasedOnPreferences = (preferences) => {
    setLoading(true);
    fetchAnimalsWithRetry(preferences);
  };

  return {
    preferredAnimals,
    loading,
    fetchAnimalsBasedOnPreferences,
  };
};

export default useAnimalsBasedOnPreferencesAPI;
