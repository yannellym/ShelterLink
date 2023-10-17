import React, { useState } from 'react';
import '../styles/UserPreferencesForm.css';

const UserPreferencesForm = ({ onPreferencesSubmit }) => {
  const ageCategories = {
    1: 'Baby',
    2: 'Young',
    3: 'Adult',
    4: 'Senior',
  };

  const [type, setType] = useState('dog');
  const [size, setSize] = useState('Large');
  const [age, setAge] = useState(1);
  const [selectedAgeCategory, setSelectedAgeCategory] = useState(ageCategories[0]); 
  const [gender, setGender] = useState('Male');
  const [temperament, setTemperament] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false); // State to control message visibility



  const handleAgeChange = (event) => {
    const selectedAge = Number(event.target.value);
    setAge(selectedAge);
    setSelectedAgeCategory(ageCategories[selectedAge]);
    setMessageVisible(selectedAge !== 0); // Check if both "Type" and "Age" are set
  };

  const handleTemperamentChange = (event) => {
    const value = event.target.value;
    const selectedTemperaments = [...temperament];

    if (selectedTemperaments.includes(value)) {
      // Remove the temperament if it's already selected
      selectedTemperaments.splice(selectedTemperaments.indexOf(value), 1);
    } else {
      // Add the temperament if it's not selected
      selectedTemperaments.push(value);
    }

    setTemperament(selectedTemperaments);
   
  };

  const getSelectedPreferences = () => {
    const preferences = {
      pet: type,
      size: size,
      age: selectedAgeCategory,
      gender: gender,
      temperament: temperament.join(', '),
    };

    const formattedMessage = `You want a ${preferences.pet} of ${preferences.size} size, ${preferences.gender}, plus a ${preferences.age}. This pet will be: ${preferences.temperament}.`;

    return formattedMessage;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit button clicked'); 
    const userPreferences = {
      type,
      size,
      age: selectedAgeCategory,
      gender,
      temperament,
    };
    console.log(userPreferences, "userpref");
    onPreferencesSubmit(userPreferences);
  };

  return (
    <div className="container">
      <h2>Find your perfect match:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-options">
          <label>
            <input
              type="radio"
              name="type"
              value="Dog"
              checked={type === 'Dog'}
              onChange={() => setType('Dog')}
            />{' '}
            Dog 🐶
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="Cat"
              checked={type === 'Cat'}
              onChange={() => setType('Cat')}
            />{' '}
            Cat 🐱
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="other"
              checked={type === 'Barnyard'}
              onChange={() => setType('Barnyard')}
            />{' '}
            Other 🐴🐓🐷
          </label>
        </div>
        <div className="form-options">
          <div className="form-option">
            <label htmlFor="size">Size:</label>
            <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="any">Any</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="form-option">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value="any">Any</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>

        <label>Age Range:</label>
        <input
          type="range"
          id="age"
          value={age}
          onChange={handleAgeChange}
          min="1"
          max="4" 
        />
        <span>{ageCategories[age]}</span> {/* Display the age category */}

        <label>Characteristics:</label>
        <div className="temperament-options">
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="Friendly"
              checked={temperament.includes('Friendly')}
              onChange={handleTemperamentChange}
            />{' '}
            Friendly 🙂
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="Playful"
              checked={temperament.includes('Playful')}
              onChange={handleTemperamentChange}
            />{' '}
            Playful 🎾
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="Smart"
              checked={temperament.includes('Smart')}
              onChange={handleTemperamentChange}
            />{' '}
            Smart 😌
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="Gentle"
              checked={temperament.includes('Gentle')}
              onChange={handleTemperamentChange}
            />{' '}
            Gentle 🥹
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="Funny"
              checked={temperament.includes('Funny')}
              onChange={handleTemperamentChange}
            />{' '}
            Funny 🤪
          </label>
        </div>
        <div className="selected-preferences">
          <h3>Selected Preferences:</h3>
          <p>{getSelectedPreferences()}</p>
        </div>
        {messageVisible && (
          <div className="message">
            <p>Great choices. Let's find your perfect match!</p>
          </div>
        )}
        <button type="submit">Find My Match</button>
      </form>
    </div>
  );
};

export default UserPreferencesForm;
