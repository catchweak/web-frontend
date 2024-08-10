import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/login.css";
import axiosClient from "@src/utils/axiosHelper";

function Login(props) {
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post("/login", credentials);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      // On successful login
      const { accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);

      console.log("Login successful:", response.data);
      alert("로그인 성공");
      window.location.href = "/";
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3"></div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Sign in to your account
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="userId"
                          id="userId"
                          placeholder="id를 입력하세요"
                          value={credentials.userId}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="userId" className="form-label">
                          ID
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={credentials.password}
                          onChange={handleChange}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex gap-2 justify-content-between">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            name="rememberMe"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="rememberMe"
                          >
                            Keep me logged in
                          </label>
                        </div>
                        <a
                          href="#!"
                          className="link-primary text-decoration-none"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      {error && <p className="text-danger">{error}</p>}
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Log in"}
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="link-primary text-decoration-none"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
