import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login() {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //   let navigate = useNavigate();

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("empty");
      setError(true);
    } else {
      console.log("hello", email, password);
      setSubmitted(true);
      setError(false);
      //   e.preventDefault();
      //   const token = await loginUser({
      //     email,
      //     password,
      //   });
      //   setToken(token);
      console.log("");
      window.location.href = "/dashboard";
    }
  };

  // Showing error message if error is true

  return (
    <form>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleEmail}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handlePassword}
          value={password}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
      <p className="forgot-password">
        Don't have an account? <a href="/sign-up">Sign up</a>
      </p>
    </form>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
