import React, { useEffect } from 'react';
import Header from '../components/Header';
import UserHome from '../components/UserHome';
import NewLoanForm from '../components/NewLoanForm';
const NewLoan = () => {
  return (
    <div>
        <Header/>
        <NewLoanForm/>
    </div>
  );
};

export default NewLoan;
