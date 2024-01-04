import React, { useState } from 'react';
import '../styles/SignIn.css'; 

/* component to display resources for the user
  parameters: 
  returns: 
*/
//TODO: IMPLEMENT SIG IN FUNC
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle the sign-in logic using an authentication system
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form">
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
        <button className="signin-button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      <p className="signup-prompt">
        Don't have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
};

export default SignIn;