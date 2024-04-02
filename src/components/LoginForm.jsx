import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequiredSharp from "./RequiredSharp";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) navigate("/home", { replace: true });
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenType", data.tokenType);
        localStorage.setItem("id", data.id);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);

        window.location.href = "home";
      } else {
        // Handle login failure
        alert("Đăng nhập thất bại!");
      }
    } catch (error) {
      // Handle network error
      alert("Error:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng nhập</h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <RequiredSharp /> Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <RequiredSharp /> Mật khẩu:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  Bạn chưa có tài khoản, <a href="/signup">Đăng ký</a>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3 fs-5"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
