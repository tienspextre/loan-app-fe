import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) navigate("/home", {replace: true});
  })

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('role', data.roles);
        sessionStorage.setItem('email', data.email);
        // console.log('Login successful');
        navigate("/home", {replace: true});
      } else {
        // Handle login failure
        alert('Login failed');
      }
    } catch (error) {
      // Handle network error
      alert('Error:', error.message);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Login</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <a href="/signup">Đăng ký</a>
                <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
