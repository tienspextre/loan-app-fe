import React, { useEffect } from 'react';
import Header from '../components/Header';
import UserHome from '../components/UserHome';
const Home = () => {

    useEffect(() => {
        document.title = "Admin Home";
    })
  return (
    <div className="user-home">
        <Header/>
        <AdminHome/>
    </div>
  );
};

export default Home;
