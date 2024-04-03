import React, { useEffect, useState } from "react";
import NewLoanForm from "../components/NewLoanForm";
import SignupForm from "../components/SignupDetail";

const NewLoan = () => {
  const [isDeclare, setIsDeclare] = useState(0);

  useEffect(() => {
    const isDelcareStored = localStorage.getItem("isDelcared");
    setIsDeclare(isDelcareStored);
  }, []);

  return (
    <div
      style={{
        height: "auto",
        background:
          "linear-gradient(90deg, rgba(55,59,68,1) 0%, rgba(66,134,244,1) 100%)",
      }}
    >
      {isDeclare === "0" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="h1">
            Bạn phải khai báo thông tin trước khi vay tiền
          </div>
          <button className="btn btn-success">Khai báo</button>
          <div className="w-100">
            <SignupForm />
          </div>
        </div>
      ) : (
        <NewLoanForm />
      )}
    </div>
  );
};

export default NewLoan;
