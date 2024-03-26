import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const handleSignup  = async () => {

      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, role: ['ROLE_USER'], password })
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
          const data1 = await response1.json();
          sessionStorage.setItem('token', data1.accessToken);
          sessionStorage.setItem('id', data1.id);
          sessionStorage.setItem('role', data1.roles);
          // console.log('Login successful');
          navigate("/signupdetail", {replace: true});
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Đăng ký tài khoản</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                  <input type="text" className="form-control" id="username" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <input type="password" className="form-control" id="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleSignup}>Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
