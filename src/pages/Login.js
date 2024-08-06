import React, { useState } from "react";
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

      // 성공적으로 로그인 시 수행할 작업
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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={credentials.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
