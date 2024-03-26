import React, { useEffect } from 'react';
import Header from '../components/Header';
import UserHome from '../components/UserHome';
const Home = () => {
  useEffect(() => {
    document.title = "Loan List";
})
  return (
    <div className="user-home">
        <Header/>
        <UserHome/>
    </div>
  );
};

export default Home;
