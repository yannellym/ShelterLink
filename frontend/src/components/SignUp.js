import React, { useState } from 'react';
import '../styles/SignUp.css'; // Import your custom CSS for SignUp

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle the sign-up logic using an authentication system
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signup-button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      <p className="signin-prompt">
        Already have an account? <a href="/signin">Sign in here</a>.
      </p>
    </div>
  );
};

export default SignUp;
