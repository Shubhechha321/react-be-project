import { useState, useEffect } from "react";
import styles from "./SignupSignIn.module.css";

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

export default function Login({ setToken, setRole }) {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
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
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json(); // wait for the response to resolve and parse the JSON data
      console.log(data); // log the JSON data to the console
      console.log(data.role);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setSubmitted(true);
      setAccessToken(data.accessToken);
      setUserRole(data.role);
      setUserId(data._id);
      // localStorage.getItem("token")
      console.log("response: ", response.json);
      setError(false);
    } catch (err) {
      setLoginError(true);
      console.log("error occured");
      // console.error(err);
    }
  };

  function payload() {
    const token = accessToken;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    console.log("payload", payload.result);
    return payload.result._id;
  }

  useEffect(() => {
    // pass accessToken to App.js as prop once it is available
    if ((accessToken, userRole)) {
      // props.setAccessToken(accessToken);
      setToken(accessToken);
      setRole(userRole);
      payload();
      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("role", JSON.stringify(userRole));
      localStorage.setItem("userId", payload());
      // navigate("/");
    }
  }, [accessToken, userRole, userId]);

  if (submitted) {
    if (userRole === "applicant") window.location.href = "/jobs";
    else window.location.href = "/recruiterJobs";
  }

  // Showing error message if error is true

  return (
    <form
      className={styles.form}
      style={{
        marginTop: "100px",
      }}
    >
      <h3 className={styles.heading}>Sign In</h3>
      <div className="mb-3">
        <label className={styles.label}>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleEmail}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label className={styles.label}>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handlePassword}
          value={password}
        />
      </div>
      {/* <div className="mb-3">
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
      </div> */}
      <div
        className="mb-3"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="custom-control custom-checkbox"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label
            className="custom-control-label"
            htmlFor="customCheck1"
            style={{ whiteSpace: "nowrap", marginLeft: "10px" }}
          >
            Remember me
          </label>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Please fill in all fields
        </div>
      )}
      {loginError && (
        <div className="alert alert-danger" role="alert">
          Wrong username or password
        </div>
      )}
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
