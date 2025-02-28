import React, { useContext, useState } from "react";
import "../../Styles/Components/Auth/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { UserContext } from "../../Context/userContext";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setUser, setIsAuthenticated } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      ); // Include credentials

      console.log("Sign in response:", response);

      // Log the user data
      console.log("User data from response:", response.data.user);

      // Handle form submission logic here
      setIsAuthenticated(true);
      setIsLoading(false);
      setUser(response.data.user); // Set only the user data
      const token = response.data.token;
      Cookies.set("auth_token", token);
      console.log("Token stored:", token);

      // Redirect to home page using useHistory hook
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      if (error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <>
      <div className="LoginPage">
        <div className="Logincontainer">
          <h2 className="card-title text-center">Login here!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
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
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register-user">Register here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
