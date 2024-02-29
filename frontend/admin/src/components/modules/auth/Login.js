import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Constants from "../../../Constants";
import logo from "../../../assets/img/logo.png";
const Login = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const hundleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = () => {
    axios
      .post(Constants.BASE_URL + "/login", input)
      .then((res) => {
        localStorage.email = res.data.email;
        localStorage.name = res.data.name;
        localStorage.phone = res.data.phone;
        localStorage.token = res.data.token;
        window.location.reload();
      })
      .catch((errors) => {
        if (errors.response.status == 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <div>
      <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
              <div class="card bg-white">
                <div class="card-body p-5">
                  <div class="mb-3 mt-md-4">
                    <h2 class="fw-bold mb-2 text-uppercase d-flex justify-content-center ">
                      <img
                        src={logo}
                        alt="logo"
                        className="$thumbnail-padding"
                        width="87"
                      />
                    </h2>

                    <div class="mb-3">
                      <label for="email" class="form-label ">
                        Email address
                        <p class="text-danger">
                          <small>
                            {errors.email !== undefined
                              ? errors.email[0]
                              : null}
                          </small>
                        </p>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name={"email"}
                        value={input.email}
                        onChange={hundleInput}
                        placeholder="name@example.com"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label ">
                        Password
                        <p class="text-danger">
                          <small>
                            {errors.password !== undefined
                              ? errors.password[0]
                              : null}
                          </small>
                        </p>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name={"password"}
                        value={input?.password}
                        onChange={hundleInput}
                        placeholder="*******"
                      />
                    </div>
                    <div class="d-grid">
                      <button
                        class="btn btn-outline-dark"
                        type="submit"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
