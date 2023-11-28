import { useState, useEffect } from 'react';

const useAnimalsBasedOnPreferencesAPI = () => {
  const [preferredAnimals, setPreferredAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  let abortController;

  useEffect(() => {
    setLoading(false); // This will be triggered whenever preferredAnimals changes
  }, [preferredAnimals]);

  const fetchAnimals = async (preferences) => {
    try {
      const gender = preferences.gender !== 'any' ? preferences.gender : 'Male';
      const size = preferences.size !== 'any' ? preferences.size : 'Large';

      const apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_match?perPage=100&type=${preferences.type}&gender=${gender}&age=${preferences.age}&size=${size}`;
      console.log(apiUrl);

      // Clear the abortController on each new request
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();

      const response = await fetch(apiUrl, { signal: abortController.signal });
      const prefdata = await response.json();
      console.log(prefdata.body);

      let filteredAnimals = [];

      try {
        // the response body is a JSON string. We need to parse it
        const parsedBody = JSON.parse(prefdata.body);
        // if we were able to parse it and it contains animals
        if (parsedBody && parsedBody.animals) {
          // filter based on preferences
          filteredAnimals = parsedBody.animals.filter((animal) => {
            const matchesTags = preferences.temperament.some((prefTemperament) =>
              animal.tags.includes(prefTemperament)
            );
            return matchesTags || preferences.temperament.length === 0;
          });
        } else {
          console.error('Invalid data received from the API:', parsedBody);
        }
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
      
      // Set the preferred animals state variable with the filtered results
      setPreferredAnimals(filteredAnimals);

      // Stop retrying after the first attempt
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pet data:', error);

      // Stop retrying after encountering an error
      setLoading(false);
    }
  };

  const fetchAnimalsBasedOnPreferences = (preferences) => {
    setLoading(true);
    fetchAnimals(preferences);
  };

  return {
    preferredAnimals,
    loading,
    fetchAnimalsBasedOnPreferences,
  };
};

export default useAnimalsBasedOnPreferencesAPI;
