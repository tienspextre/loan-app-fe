import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SignupForm() {
  const [phone, setPhone] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [address, setAddress] = useState('');
  const [idNumber, setidNumber] = useState('');
  const [dob, setDob] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    setId(sessionStorage.getItem('id'));
    const headers = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` };
    fetch('http://localhost:8080/api/branchInfos', { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      setBranches(data);
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching branches data:', error);
    });
    setGender('MALE');
  }, []);
  

  const handleSignup  = async (event) => {
    event.preventDefault();
    setEmail(sessionStorage.getItem('email'));
    try {
      const headers = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 'Content-Type': 'application/json; charset=UTF-8', };
      const body = JSON.stringify({id, firstName, lastName, dob, gender, idNumber, phone, email, address})
      console.log(body);
      fetch('http://localhost:8080/api/personal-info/create', { 
        method: "POST",
        headers,
        body
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to post data');
        }
        alert("Success");
        navigate("/home", {replace: true});
        return response.json();
      })
      .then(data => {
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
    } catch (error) {
      // Handle network error
      console.error('Error:', error.message);
    }
  }

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value); // Update selectedBranch state when the value changes
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Nhập thông tin</h5>
              <form  onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Họ</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Nhập họ" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Tên</label>
                  <input type="text" className="form-control" id="firstName" placeholder="Nhập tên" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Giới tính</label>
                  <select
                    id="inputGenger"
                    className="form-control"
                    value={gender} // Set the value of the select to the selectedBranch state
                    onChange={(e) => setGender(e.target.value)}
                    required// Call handleBranchChange when the value changes
                  >
                    <option value="MALE" default>Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">CCCD/CMND</label>
                  <input type="text" className="form-control" id="idNumber" placeholder="Nhập số idNumber/CMND" value={idNumber} onChange={(e) => setidNumber(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Ngày sinh</label>
                    <br/>
                    <DatePicker selected={dob} onChange={(date) => setDob(date)} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" pattern="^0\d{9}$" required value={phone} onChange={(e)  => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">Chi nhánh</label>
                  <select
                    id="inputProvince"
                    className="form-control"
                    value={selectedBranch} // Set the value of the select to the selectedBranch state
                    onChange={handleBranchChange}
                    required // Call handleBranchChange when the value changes
                  >
                    <option value="">Chọn chi nhánh</option>
                    {branches.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.branchName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Địa chỉ</label>
                  <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Lưu thông tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
