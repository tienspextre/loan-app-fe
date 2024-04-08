import React from "react";
import RequiredSharp from "./RequiredSharp";

const LoanInfoForm = ({ loanInfo, setLoanInfo, setLoanInsuranceAmount }) => {
  return (
    <>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputAmount">
          <RequiredSharp />
          Số tiền đề nghị vay:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAmount"
          placeholder="Số tiền vay"
          value={loanInfo.loanAmount}
          onChange={(e) => {
            setLoanInfo((prev) => ({
              ...prev,
              loanAmount: e.target.value,
            }));

            setLoanInsuranceAmount(e.target.value * 0.1);
          }}
          required
        />
      </div>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputTime">
          <RequiredSharp />
          Thời hạn vay (Tháng):
        </label>
        <input
          type="number"
          className="form-control"
          id="inputTime"
          placeholder="Thời hạn vay"
          value={loanInfo.loanTerm}
          onChange={(e) =>
            setLoanInfo((prev) => ({
              ...prev,
              loanTerm: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputSalary">
          <RequiredSharp />
          Thu nhập hiện tại:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSalary"
          placeholder="Thu nhập hiện tại"
          value={loanInfo.currentEarning}
          onChange={(e) =>
            setLoanInfo((prev) => ({
              ...prev,
              currentEarning: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputSalary">Lãi xuất (%):</label>
        <input
          type="number"
          className="form-control"
          id="inputSalary"
          placeholder="Thu nhập hiện tại"
          value={Math.round(loanInfo.loanInterestRate * 100)}
          onChange={(e) =>
            setLoanInfo((prev) => ({
              ...prev,
              loanInterestRate: e.target.value,
            }))
          }
          required
          disabled
        />
      </div>
    </>
  );
};

export default LoanInfoForm;
