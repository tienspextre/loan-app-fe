import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RequiredSharp from './RequiredSharp';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [branches, setBranches] = useState([]);
  const [email, setEmail] = useState('');
  const [cccd, setCccd] = useState('');
  const [dob, setDob] = useState(new Date());
  const [role, setRole] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  })

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, role: [{ id: 1 }, { id: 2 }], password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Signup successful:', data);
      alert(data.message);
      const response1 = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response1.ok) {
        console.log('Đăng nhập thành công');
        navigate("/login", { replace: true });
      } else {
        alert(data.message);
      }
    } else {
      const data = await response.json();
      alert(data.message);
      console.error('Signup failed:', data.message);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng ký tài khoản</h4>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label"><RequiredSharp /> Tên đăng nhập:</label>
                  <input type="text" className="form-control" id="username" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><RequiredSharp /> Email:</label>
                  <input type="email" className="form-control" id="email" placeholder="Nhập email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label"><RequiredSharp /> Mật khẩu:</label>
                  <input type="password" className="form-control" id="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                  Bạn đã có <a href="/login">tài khoản!</a>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3 fs-5" >Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
