// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Landing from "./views/Landing"; // Assuming you have a Home component
import Home from "./views/Home";
import NewLoan from "./views/NewLoan";
import Signup from "./views/Signup";
import SignupDetail from "./components/SignupDetail";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newloan" element={<NewLoan />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupdetail" element={<SignupDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
