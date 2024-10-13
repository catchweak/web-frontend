import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@src/utils/axiosHelper";

function Signup(props) {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    name: "",
    password: "",
    iAgree: false
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosClient.post("/api/signup", formData);

      if (response.status === 201) {
        console.log("회원가입 성공:", response.data);
        alert("회원가입에 성공하였습니다.\n 로그인 해주세요.");
        window.location.href = "/login";
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (error) {
      console.error("서버 통신 오류:", error);
    }
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h2 className="h4 text-center">회원가입</h2>
                      <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                        catch weak의 회원이 되세요
                      </h3>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="userId"
                          id="userId"
                          placeholder="First Name"
                          value={formData.userId}
                          onChange={handleInputChange}
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
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="First Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          이름
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
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="iAgree"
                          id="iAgree"
                          checked={formData.iAgree}
                          onChange={handleInputChange}
                          required
                        />
                        <label
                          className="form-check-label text-secondary"
                          htmlFor="iAgree"
                        >
                          I agree to the
                          <a
                            href="#!"
                            className="link-primary text-decoration-none"
                          >
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <p className="m-0 text-secondary text-center">
                      Already have an account?
                      <Link
                        to="/login"
                        className="link-primary text-decoration-none"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="mt-5 mb-5">Or continue with</p>
                    <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                      <a
                        href="#!"
                        className="btn btn-lg btn-outline-danger p-3 lh-1"
                      >
                        <i className="fa fa-heart"></i> Like
                      </a>
                      <a
                        href="#!"
                        className="btn btn-lg btn-outline-primary p-3 lh-1"
                      >
                        <i className="fa fa-comment"></i> Comment
                      </a>
                      <a
                        href="#!"
                        className="btn btn-lg btn-outline-info p-3 lh-1"
                      >
                        <i className="fa fa-share"></i> Share
                      </a>
                      <a
                        href="#!"
                        className="btn btn-lg btn-outline-dark p-3 lh-1"
                      >
                        <i className="fa fa-bookmark"></i> Save
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
