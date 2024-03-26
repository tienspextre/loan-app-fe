import React from 'react';
import Header from '../components/Header';
import NewLoanForm from '../components/NewLoanForm';

const NewLoan = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '70px', overflowY: 'auto', maxHeight: 'calc(100vh - 70px)' }}>
        {/* Adjust marginTop to match the height of your Header */}
        <NewLoanForm />
      </div>
    </div>
  );
};

export default NewLoan;
