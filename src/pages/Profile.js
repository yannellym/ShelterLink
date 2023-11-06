// Profile.js

import React from 'react';
import { Auth } from 'aws-amplify';

const Profile = () => {
  const user = Auth.user;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.attributes.email}</p>
    </div>
  );
};

export default Profile;
