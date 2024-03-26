// Login.js
import React, { useEffect } from 'react';
import SignupForm from '../components/SignupForm.js' // Import the LoginForm component

export default function Signup(){
  useEffect(() => {
      document.title = "Signup";
  })
  return (
    <div>
      <SignupForm /> {/* Render the LoginForm component */}
    </div>
  );
};
 