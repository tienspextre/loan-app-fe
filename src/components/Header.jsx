import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    const token = sessionStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const id = sessionStorage.getItem("id");
      fetch(`http://localhost:8080/api/personal-info/${id}`, {
        headers,
        mode: "cors",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch personal info");
          }
        })
        .then((data) => {
          setName(data.firstName);
          console.log(data.firstName);
        })
        .catch((error) => {
          // Handle network error
          console.error("Error:", error.message);
        });
    }
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <header className="Header">
      <a href="/">
        <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
      </a>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <div>{name ? <a href="/">Xin chào {name}</a> : <a href="/"></a>}</div>
          <a href="/home">Danh sách đơn</a>
          <a href="/newloan">Đăng ký vay</a>
          {/* <div className="flex"> */}
          <a
            href={name ? "/logout" : "/login"}
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {name ? "Đăng xuáta" : "Đăng nhập"}
          </a>
          {!name && (
            <a href="/signup" className="btn btn-outline-primary">
              Đăng ký
            </a>
          )}
          {/* </div> */}
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}
