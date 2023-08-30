import React, { useState } from 'react';
import '../styles/UserPreferencesForm.css'; 

const UserPreferencesForm = () => {
  const [size, setSize] = useState('small');
  const [age, setAge] = useState(0);
  const [activity, setActivity] = useState('low');
  const [gender, setGender] = useState('male');
  const [temperament, setTemperament] = useState([]);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleTemperamentChange = (event) => {
    const value = event.target.value;
    if (temperament.includes(value)) {
      setTemperament(temperament.filter((item) => item !== value));
    } else {
      setTemperament([...temperament, value]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Perform pet matching based on user preferences
  };

  return (
    <div className="container">
      <h1>Find your perfect match:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>Gender:</label>
        <div className="gender-options">
        <label><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female  </label>
        <label><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male  </label>
        <label><input type="radio" name="gender" value="any" checked={gender === 'any'} onChange={() => setGender('any')} /> Any </label>
        </div>

        <label>Age Range:</label>
        <input
        type="range"
        id="age"
        value={age}
        onChange={handleAgeChange}
        min="0"
        max="10"
        />
        <span>
        {age < 1 ? 'months' : age >= 10 ? '10+' : `${age} `}
        </span>

        <label>Activity Level:</label>
        <div className="form-options">
        <label><input type="radio" name="activity" value="low" checked={activity === 'low'} onChange={() => setActivity('low')} /> Low 🔥</label>
        <label><input type="radio" name="activity" value="medium" checked={activity === 'medium'} onChange={() => setActivity('medium')} /> Medium 🔥🔥</label>
        <label><input type="radio" name="activity" value="high" checked={activity === 'high'} onChange={() => setActivity('high')} /> High 🔥🔥🔥</label>
        </div>

        <label>Temperament:</label>
        <div className="temperament-options">
        <label><input type="checkbox" name="temperament" value="friendly" checked={temperament.includes('friendly')} onChange={handleTemperamentChange} /> Friendly 🙂 </label>
        <label><input type="checkbox" name="temperament" value="playful" checked={temperament.includes('playful')} onChange={handleTemperamentChange} /> Playful 🎾 </label>
        <label><input type="checkbox" name="temperament" value="calm" checked={temperament.includes('calm')} onChange={handleTemperamentChange} /> Calm 😌 </label>
        <label><input type="checkbox" name="temperament" value="active" checked={temperament.includes('active')} onChange={handleTemperamentChange} /> Active 🏃 </label>
        </div>

        <button type="submit">Find My Match</button>
      </form>
    </div>
  );
};

export default UserPreferencesForm;
