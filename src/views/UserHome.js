import React, { useEffect } from 'react';
import Header from '../components/Header';
import UserHome from '../components/UserHome';

const Home = () => {
  useEffect(() => {
    document.title = "Loan List";
  }, []);

  return (
    <div className="user-home">
        <Header/>
        <h1 style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Danh sách đơn vay</h1>
        <UserHome/>
    </div>
  );
};

export default Home;
