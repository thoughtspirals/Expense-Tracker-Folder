import React from "react";
import { useState } from "react";
import "../../Styles/Components/Auth/register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [income, setIncome] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/auth/register`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        phone: phone,
        income_monthly: Number(income),
        username: username,
      });
      console.log("res is ", res);
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 409) {
        setError("An account with this email already exists.");
      }
    }

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // You can handle signup logic here (API call, form submission, etc.)
    alert("Sign Up Successful");
    navigate("/login-user");
  };
  return (
    <>
      <div className="LoginPage">
        {/* <h1 className="pageTitle text-center p-4"> Login Page</h1> */}
        <div className="Logincontainer">
          <h2 className="card-title text-center">Register here!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="name"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="monthly-income">Monthly Income</label>
              <input
                type="Monthly Income"
                className="form-control"
                id="income"
                placeholder="Monthly Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login-user">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
