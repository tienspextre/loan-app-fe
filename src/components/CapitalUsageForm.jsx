import React from "react";
import RequiredSharp from "./RequiredSharp";

const CapitalUsageForm = ({ capitalUsage, setCapitalUsage }) => {
  return (
    <>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputBase">
          <RequiredSharp />
          Vốn tự có:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputBase"
          placeholder=""
          value={capitalUsage.totalCapital}
          onChange={(e) =>
            setCapitalUsage((prev) => ({
              ...prev,
              totalCapital: e.target.value,
            }))
          }
          required
        />
      </div>
      <div className="mb-3 col-sm-8 col-lg-6">
        <label htmlFor="why" className="form-label">
          <RequiredSharp />
          Mục đích sử dụng:
        </label>
        <select
          id="why"
          className="form-select"
          value={capitalUsage.purpose} // Set the value of the select to the selectedBranch state
          onChange={(e) =>
            setCapitalUsage((prev) => ({
              ...prev,
              purpose: e.target.value,
            }))
          }
        >
          <option value="HOME_LOAN">Mua nhà</option>
          <option value="CAR_LOAN">Mua xe</option>
          <option value="EDUCATION_LOAN">Học tập</option>
        </select>
      </div>
      <div className="mb-3 col-sm-8 col-lg-6">
        <label htmlFor="source" className="form-label">
          <RequiredSharp />
          Phương thức trả lãi:
        </label>
        <select
          id="source"
          className="form-select"
          value={capitalUsage.source} // Set the value of the select to the selectedBranch state
          onChange={(e) =>
            setCapitalUsage((prev) => ({
              ...prev,
              source: e.target.value,
            }))
          }
        >
          <option value="BANK_TRANSFER">Chuyển khoản</option>
          <option value="ACCOUNT_DEDUCTION">Trừ vào tài khoản</option>
        </select>
      </div>
    </>
  );
};

export default CapitalUsageForm;
