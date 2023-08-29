import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('/api/dogs')  // Assuming your Flask API endpoint is /api/dogs
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(error => console.error('Error fetching dog data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PetFinder Dog Browser</h1>
      </header>
      <main>
        <h2>Browse Dogs</h2>
        <ul>
          {dogs.map(dog => (
            <li key={dog.id}>{dog.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;