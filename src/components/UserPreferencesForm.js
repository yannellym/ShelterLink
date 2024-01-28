import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  const [selectedAgeCategory, setSelectedAgeCategory] = useState(ageCategories[1]);
  const [gender, setGender] = useState('Male');
  const [temperament, setTemperament] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [isFindingMatch, setIsFindingMatch] = useState(false);

  const handleAgeChange = (event) => {
    const selectedAge = Number(event.target.value);
    setAge(selectedAge);
    setSelectedAgeCategory(ageCategories[selectedAge]);
    setMessageVisible(selectedAge !== 0);
  };

  const handleTemperamentChange = (event) => {
    const value = event.target.value;
    const selectedTemperaments = [...temperament];

    if (selectedTemperaments.includes(value)) {
      selectedTemperaments.splice(selectedTemperaments.indexOf(value), 1);
    } else {
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

    return `You want a ${preferences.pet} of ${preferences.size} size, ${preferences.gender}, plus a ${preferences.age}. This pet will be: ${preferences.temperament}.`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userPreferences = {
      type,
      size,
      age: selectedAgeCategory,
      gender,
      temperament,
    };

    setIsFindingMatch(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    onPreferencesSubmit(userPreferences);
  };

  return (
    <div className="container">
      <h2>Find your perfect match:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-options">
          <div className="form-option">
            <label htmlFor="petType">I want a:</label>
            <select id="petType" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Dog">Dog 🐶</option>
              <option value="Cat">Cat 🐱</option>
              <option value="Barnyard">Other 🐴🐓🐷</option>
            </select>
          </div>

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

        <div className="age-characteristics-container">
          <div>
            <label>Age Range:</label>
            <input
              type="range"
              id="age"
              value={age}
              onChange={handleAgeChange}
              min="1"
              max="4"
            />
            <span>{ageCategories[age]}</span>
          </div>

          <div className="form-option">
            <label htmlFor="characteristics">Characteristics:</label>
            <select
              id="characteristics"
              value={temperament}
              onChange={(e) => setTemperament([e.target.value])}
            >
              <option value="Friendly">Friendly 🙂</option>
              <option value="Playful">Playful 🎾</option>
              <option value="Smart">Smart 😌</option>
              <option value="Gentle">Gentle 🥹</option>
              <option value="Funny">Funny 🤪</option>
            </select>
          </div>
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

        <button className="find-match-button" type="submit">
          {isFindingMatch ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            'Find My Match'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserPreferencesForm;
