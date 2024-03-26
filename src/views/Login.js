// Login.js
import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm.js' // Import the LoginForm component

export default function Login(){
  useEffect(() => {
    document.title = "Login";
  })
  return (
    <div>
      <LoginForm /> {/* Render the LoginForm component */}
      
    </div>
  );
};
