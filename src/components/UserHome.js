import React, { useEffect, useState } from 'react';
import LoanApplicationTable from './LoanApplicationTable';

const UserHome = () => {
  const [name, setName] = useState('');
  const [loanApplications, setLoanApplications] = useState([]);


  const handleDetailClick = (userId) => {
    alert(`Detail button clicked for user ${userId}`);
    // Implement your logic for handling the detail button click here
  };

  useEffect(() => {
    const fetchLoanApplications = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      try {
        const response = await fetch("http://localhost:8080/api/loanApplications", requestOptions);
        const result = await response.json();
        setLoanApplications(result);
      } catch (error) {
        console.error(error);
      };
    }

    fetchLoanApplications();
  }, [])

  return (
    <div className="p-3 mt-3">
      <LoanApplicationTable dataArray={loanApplications} />
    </div>
  );
};

export default UserHome;
