import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewLoanForm.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const NewLoanForm = () => {
  const [personalInfo, setPersonalInfo] = useState('');
  const [accountInfo, setAccountInfo] = useState({})
  const [contactInfo1, setContactInfo1] = useState('');
  const [contactInfo2, setContactInfo2] = useState('');
  const [loanApplication, setLoanApplication] = useState('');
  const [loanInfo, setLoanInfo] = useState('');
  const [capitalUsage, setCapitalUsage] = useState('');
  const [totalCapital, setTotalCapital] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` };
      const id = sessionStorage.getItem('id');
      fetch(`http://localhost:8080/api/personal-info/${id}`, { headers, mode: "cors" })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch personal info');
          }
        })
        .then(data => {
          setPersonalInfo(data);
          console.log(data);
        })
        .catch(error => {
          // Handle network error
          console.error('Error:', error.message);
        });
    }
  }, []);

  const handleSubmit = () => {

  };

  return (
    <div>
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Đăng ký vay vốn</h1>
                {/* <form>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                      <label className="form-check-label" htmlFor="inlineRadio1">Vay</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                      <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled/>
                      <label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</label>
                  </div>
              </form> */}
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputName">Họ và tên</label>
                      <input type="text" className="form-control" id="inputName" placeholder="Họ và tên" value={personalInfo.lastName + " " + personalInfo.firstName} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPhone">Số điện thoại</label>
                      <input type="text" className="form-control" id="inputPhone" placeholder="Số điện thoại" pattern="^0\d{9}$" title="Số điện thoại không hợp lệ" required value={personalInfo.phone} />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="dob" className="form-label">Ngày sinh</label>
                      <br />
                      <DatePicker selected={personalInfo.dob} onChange={(date) => setPersonalInfo({ ...personalInfo, dob: date })} required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCCCD">CMND/CCCD</label>
                      <input type="text" className="form-control" id="inputCCCD" placeholder="CMND/CCCD" required value={personalInfo.idNumber} />
                    </div>
                    {/* <div className="form-group col-md-6">
                      <label htmlFor="inputCCCDDate">Ngày cấp</label>
                      <input type="text" className="form-control" id="inputCCCDDate" placeholder="Ngày cấp" required />
                    </div> */}
                    {/* <div className="form-group col-md-4">
                      <label htmlFor="inputCCCDProvince">Nơi cấp</label>
                      <select id="inputCCCDProvince" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div> */}
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Email</label>
                      <input type="email" className="form-control" id="inputEmail4" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required value={personalInfo.email} />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputProvince">Thành phố</label>
                      <select id="inputProvince" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={personalInfo.address} required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAmount">Số tiền đề nghị vay</label>
                    <input type="text" className="form-control" id="inputAmount" placeholder="" required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputTime">Thời hạn vay</label>
                    <input type="text" className="form-control" id="inputTime" placeholder="" required />
                  </div>
                  <div className="mb-3 col-md-6">
                    <select
                      id="term"
                      className="form-control"
                      value={loanInfo.loanTerm} // Set the value of the select to the selectedBranch state
                      onChange={(e) => setLoanInfo({ ...loanInfo, loanTerm: e })} // Call handleBranchChange when the value changes
                    >
                      <option value="MONTHS" default>Tháng</option>
                      <option value="QUARTERS">Quý</option>
                      <option value="YEARS">Năm</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputSalary">Thu nhập</label>
                    <input type="text" className="form-control" id="inputSalary" placeholder="" required />
                  </div>
                  <h3>Thông tin người thân 1</h3>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName1">Họ tên</label>
                    <input type="text" className="form-control" id="inputName1" placeholder="" value={contactInfo1.fullName} onChange={(e) => setContactInfo1({ ...contactInfo1, fullName: e })} required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputRelation1">Mối quan hệ</label>
                    <input type="text" className="form-control" id="inputRelation1" placeholder="" value={contactInfo1.relationship} onChange={(e) => setContactInfo1({ ...contactInfo1, relationship: e })} required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPhone1">Số điện thoại</label>
                    <input type="text" className="form-control" id="inputPhone1" placeholder="" value={contactInfo1.phoneNumber} pattern="^0\d{9}$" onChange={(e) => setContactInfo1({ ...contactInfo1, phoneNumber: e })} required />
                  </div>
                  <h3>Thông tin người thân 2</h3>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName2">Họ tên</label>
                    <input type="text" className="form-control" id="inputName2" placeholder="" value={contactInfo2.fullName} onChange={(e) => setContactInfo2({ ...contactInfo2, fullName: e })} required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputRelation2">Mối quan hệ</label>
                    <input type="text" className="form-control" id="inputRelation2" placeholder="" value={contactInfo2.relationship} onChange={(e) => setContactInfo2({ ...contactInfo2, relationship: e })} required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPhone2">Số điện thoại</label>
                    <input type="text" className="form-control" id="inputPhone2" placeholder="" value={contactInfo2.phoneNumber} pattern="^0\d{9}$" onChange={(e) => setContactInfo2({ ...contactInfo1, phoneNumber: e })} required />
                  </div>
                  <h3>Phương án sử dụng vốn</h3>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputBase">Vốn tự có</label>
                    <input type="text" className="form-control" id="inputBase" placeholder="" value={totalCapital} onChange={(e) => setTotalCapital(e)} required />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="why" className="form-label">Mục đích sử dụng</label>
                    <select
                      id="why"
                      className="form-control"
                      value={capitalUsage.purpose} // Set the value of the select to the selectedBranch state
                      onChange={(e) => setCapitalUsage({ ...capitalUsage, purpose: e })} // Call handleBranchChange when the value changes
                    >
                      <option value="HOME_LOAN" default>Mua nhà</option>
                      <option value="CAR_LOAN">Mua xe</option>
                      <option value="EDUCATION_LOAN">Học tập</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="source" className="form-label">Phương thức trả lãi</label>
                    <select
                      id="source"
                      className="form-control"
                      value={capitalUsage.source} // Set the value of the select to the selectedBranch state
                      onChange={(e) => setCapitalUsage({ ...capitalUsage, source: e })} // Call handleBranchChange when the value changes
                    >
                      <option value="BANK_TRANSFER" default>Chuyển khoản</option>
                      <option value="ACCOUNT_DEDUCTION">Trừ vào tài khoản</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" required />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Tôi đã đọc và đồng ý với điều khoản
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" onSubmit={handleSubmit()}>Nộp đơn</button>
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
