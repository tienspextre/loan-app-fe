// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Landing from './views/Landing'; // Assuming you have a Home component
import Home from './views/UserHome'
import NewLoan from './views/NewLoan';
import Signup from './views/Signup';
import SignupDetail from './components/SignupDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Landing/>} />
        <Route path='login' element={<Login/>} />
        <Route path='home' element={<Home/>} />
        <Route path='newloan' element={<NewLoan/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='signupdetail' element={<SignupDetail/>} />
      </Routes>
    </div>
  );
};

export default App;
