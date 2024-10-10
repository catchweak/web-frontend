import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Header = ({ categories = [], currentCategory, onCategorySelect }) => {
  // ****************     init values      **************** //
  const [subCategories, setSubCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ****************     loading(rendering) hook      **************** //
  useEffect(() => {
    // Check if JWT token exists in localStorage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [categories, currentCategory]);

  // sub category 세팅
  useEffect(() => {
    if(currentCategory === null || currentCategory === undefined) return

    // 선택한 item이 top category일 경우에만 sub categories 세팅
    if(currentCategory.parentCode == null) {
      setSubCategories([{
        code: currentCategory.code,
        name: "전체",
        parentCode: currentCategory.code
      },
        ...categories.filter(
            (category) => category.parentCode === currentCategory.code
        )
      ]);
    }
  }, [onCategorySelect, categories, currentCategory]);

  // ****************     component event handler      **************** //
  const handleCategoryClick = (categoryParam) => {
    onCategorySelect(categoryParam);
  };

  const handleSubCategoryClick = (categoryParam) => {
    onCategorySelect(categoryParam);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  // ****************     UI      **************** //
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-dark main-bg">
        <div className="container-fluid">
          <div
            className="navbar-brand logo-container"
            onClick={handleLogoClick}
          >
            <img src="/img/logo.png" alt="Logo" className="logo-image" />
            <div className="logo-text">CatchWeak</div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {categories
                .filter((category) => !category.parentCode)
                .map((category) => (
                  <li
                    key={category.code}
                    className="nav-item top-category-item"
                  >
                    <button
                      className="nav-link btn"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="d-flex header-right">
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <div className="user-menu ms-3">
                {isLoggedIn ? (
                  <button
                    className="nav-link text-white btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {subCategories.map((category) => (
              <li key={category.code} className="nav-item sub-category-item">
                <button
                  className="nav-link btn"
                  onClick={() => handleSubCategoryClick(category)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
