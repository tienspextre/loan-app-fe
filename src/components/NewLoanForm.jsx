import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewLoanForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RequiredSharp from "./RequiredSharp";
import ContactInfoForm from "./ContactInfoForm";
import LoanInfoForm from "./LoanInfoForm";
import CapitalUsageForm from "./CapitalUsageForm";

const NewLoanForm = () => {
  const [personalInfo, setPersonalInfo] = useState({
    id: 0,
    firstName: "Nguyen Van",
    lastName: "Ads",
    dob: "2000-03-25T04:11:46.020Z",
    gender: "MALE",
    idNumber: "4343476567",
    phone: "13123211",
    email: "Aasd@gmail.com",
    address: "HANOI",
  });
  const [accountInfo, setAccountInfo] = useState({
    id: 0,
    accountNumber: "string",
    legal: "string",
    emailAddress: "Aasd@gmail.com",
    phoneNumber: "1231451354",
    address: "string",
    branchInfo: {
      id: 0,
      province: {
        id: 0,
        name: "ANGIANG",
        region: "string",
      },
      branchName: "string",
      address: "string",
    },
  });
  const [contactInfo1, setContactInfo1] = useState({
    id: 0,
    fullName: "NGUYEN VAN B",
    relationship: "FATHER",
    phoneNumber: "0987654321",
  });
  const [contactInfo2, setContactInfo2] = useState({
    id: 0,
    fullName: "NGUYEN THI C",
    relationship: "MOTHER",
    phoneNumber: "0987667567",
  });
  const [loanInfo, setLoanInfo] = useState({
    id: 0,
    loanAmount: 80000000,
    loanTerm: 36,
    currentEarning: 1500000,
    loanInterestRate: 0.07,
    interestRateMargin: 0.04,
  });
  const [capitalUsage, setCapitalUsage] = useState({
    id: 0,
    totalCapital: 50000000,
    purpose: "Mua nha",
    source: "Luong",
  });

  const [loanInsurance, setLoanInsurance] = useState({
    id: 0,
    insuranceAmount: 6800000,
  });

  useEffect(() => {
    const fetchAccountInfo = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/accountInfos/user/" + userId,
          requestOptions
        );
        const result = await response.json();
        setAccountInfo(result);
      } catch (error) {
        console.error(error);
      }
    };

    const userId = localStorage.getItem("id");
    fetchAccountInfo(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loanApplication = {
      accountInfo: accountInfo,
      personalInfo: personalInfo,
      contactInfo1: contactInfo1,
      contactInfo2: contactInfo2,
      loanInfo: loanInfo,
      capitalUsage: capitalUsage,
      loanInsurance: loanInsurance,
      status: "PENDING",
      referenceNumber: "AAAAA",
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      accountInfo: accountInfo,
      personalInfo: personalInfo,
      contactInfo1: contactInfo1,
      contactInfo2: contactInfo2,
      loanInfo: loanInfo,
      capitalUsage: capitalUsage,
      loanInsurance: loanInsurance,
      referenceNumber: "AAAAA",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/loanApplications",
        requestOptions
      );
      const result = await response.json();
      alert("Gửi đơn thành công. Đợi nhân viên duyệt đơn!");
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h1
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Đăng ký vay vốn
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Thông tin cá nhân</h3>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputFirstName">
                        <RequiredSharp />
                        Họ:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstName"
                        placeholder="Họ"
                        value={personalInfo.firstName}
                        onChange={(e) =>
                          setPersonalInfo((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputName">
                        <RequiredSharp />
                        Tên:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Tên"
                        value={personalInfo.lastName}
                        onChange={(e) =>
                          setPersonalInfo((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputPhone">
                        <RequiredSharp />
                        Số điện thoại:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputPhone"
                        placeholder="Số điện thoại"
                        title="Số điện thoại"
                        required
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="dob" className="form-label">
                        <RequiredSharp />
                        Ngày sinh:
                      </label>
                      <br />
                      <DatePicker
                        className="form-select"
                        selected={personalInfo.dob}
                        onChange={(date) =>
                          setPersonalInfo({ ...personalInfo, dob: date })
                        }
                        required
                        placeholderText="mm/dd/yyyy"
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputAccountNumber">
                        <RequiredSharp />
                        STK:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAccountNumber"
                        placeholder="Số tài khoản"
                        required
                        value={accountInfo.accountNumber}
                        disabled
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputCCCD">
                        <RequiredSharp />
                        CMND/CCCD:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCCCD"
                        placeholder="CMND/CCCD"
                        required
                        value={accountInfo.legal}
                        disabled
                      />
                    </div>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputAddress">
                        <RequiredSharp />
                        Địa chỉ:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Địa chỉ"
                        required
                        value={accountInfo.address}
                        disabled
                      />
                    </div>

                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="inputEmail4">
                        <RequiredSharp />
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        required
                        value={accountInfo.emailAddress}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Thông tin hợp đồng</h3>
                    <LoanInfoForm
                      loanInfo={loanInfo}
                      setLoanInfo={setLoanInfo}
                      setLoanInsuranceAmount={(value) =>
                        setLoanInsurance((prev) => ({
                          ...prev,
                          insuranceAmount: value,
                        }))
                      }
                    />
                  </div>
                  <div className="rounded border border-black p-3 mt-3">
                    <h3>Thông tin người thân 1</h3>
                    <ContactInfoForm
                      contactInfo={contactInfo1}
                      setContactInfo={setContactInfo1}
                    />
                    <h3>Thông tin người thân 2</h3>
                    <ContactInfoForm
                      contactInfo={contactInfo2}
                      setContactInfo={setContactInfo2}
                    />
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Phương án sử dụng vốn</h3>
                    <CapitalUsageForm
                      capitalUsage={capitalUsage}
                      setCapitalUsage={setCapitalUsage}
                    />
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Bảo hiểm hợp đồng</h3>
                    <div className="form-group col-sm-8 col-lg-6">
                      <label htmlFor="a">
                        <RequiredSharp />
                        Tiền bảo hiểm:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a"
                        placeholder="Tiền bảo hiểm"
                        required
                        value={loanInsurance.insuranceAmount}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        required
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        <RequiredSharp />
                        Tôi đã đọc và đồng ý với điều khoản
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary float-end">
                    Nộp đơn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoanForm;
