import React, { useState } from 'react';
import '../styles/UserPreferencesForm.css';

const UserPreferencesForm = () => {
  const ageCategories = {
    0: 'Baby',
    1: 'Young',
    4: 'Adult',
    7: 'Senior',
  };

  const [type, setType] = useState('dog');
  const [size, setSize] = useState('any');
  const [age, setAge] = useState(0);
  const [selectedAgeCategory, setSelectedAgeCategory] = useState(ageCategories[0]); 
  const [gender, setGender] = useState('any');
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



  const areAllChoicesMade = () => {
    return type !== 'any' && size !== 'any' && age !== 0 && gender !== 'any' && temperament.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (areAllChoicesMade()) {
      setMessageVisible(true);
      // Handle the form submission (e.g., filter pets based on user preferences)
    }
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
              value="dog"
              checked={type === 'dog'}
              onChange={() => setType('dog')}
            />{' '}
            Dog 🐶
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="cat"
              checked={type === 'cat'}
              onChange={() => setType('cat')}
            />{' '}
            Cat 🐱
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="other"
              checked={type === 'other'}
              onChange={() => setType('other')}
            />{' '}
            Other 🐴🐓🐷
          </label>
        </div>
        <div className="form-options">
          <div className="form-option">
            <label htmlFor="size">Size:</label>
            <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="any">Any</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="form-option">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value="any">Any</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>

        <label>Age Range:</label>
        <input
          type="range"
          id="age"
          value={age}
          onChange={handleAgeChange}
          min="0"
          max="7" // Use max value that corresponds to "Senior"
        />
        <span>{ageCategories[age]}</span> {/* Display the age category */}
        <span>{age < 1 ? 'Baby' : age <= 3 ? 'Young' : age <= 6 ? 'Adult' : 'Senior'}</span>

        <label>Characteristics:</label>
        <div className="temperament-options">
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="friendly"
              checked={temperament.includes('friendly')}
              onChange={handleTemperamentChange}
            />{' '}
            Friendly 🙂
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="playful"
              checked={temperament.includes('playful')}
              onChange={handleTemperamentChange}
            />{' '}
            Playful 🎾
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="smart"
              checked={temperament.includes('smart')}
              onChange={handleTemperamentChange}
            />{' '}
            Smart 😌
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="gentle"
              checked={temperament.includes('gentle')}
              onChange={handleTemperamentChange}
            />{' '}
            Gentle 🥹
          </label>
          <label>
            <input
              type="checkbox"
              name="temperament"
              value="funny"
              checked={temperament.includes('funny')}
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
