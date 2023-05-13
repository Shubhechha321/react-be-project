import React, { useState } from "react";
import styles from "./SignupSignIn.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("applicant");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the first name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the username change
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    console.log("email");
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the role change
  const handleRole = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     firstName === "" ||
  //     lastName === "" ||
  //     email === "" ||
  //     password === ""
  //   ) {
  //     console.log("empty");
  //     setError(true);
  //   } else {
  //     console.log("hello", email, password);
  //     // setSubmitted(true);
  //     // setError(false);
  //     fetch("http://localhost:8800/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ firstName, lastName, email, password }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setSubmitted(true);
  //         setError(false);
  //         // Redirect to login screen
  //         window.location.href = "/sign-in";
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         setError(true);
  //       });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      role === ""
    ) {
      setError(true);
      return;
    } else setError(false);

    try {
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role,
        }),
      });
      console.log(
        "response: ",
        JSON.stringify({
          name,
          username,
          email,
          password,
          role,
        })
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setSubmitted(true);
      setError(false);
    } catch (err) {
      setError(true);
      console.log("error occured");
      console.error(err);
    }
  };

  if (submitted) {
    // Redirect to login page
    window.location.href = "/sign-in";
  }

  return (
    <form
      className={styles.form}
      style={{
        marginTop: "100px",
      }}
    >
      <h3 className={styles.heading}>Sign Up</h3>
      <div className="mb-3">
        <label className={styles.label}>Name</label>
        <input
          type=""
          className="form-control"
          placeholder="Name"
          onChange={handleName}
          value={name}
        />
      </div>
      {/* <div className="mb-3">
        <label className={styles.label}>Last name</label>
        <input
          className="form-control"
          placeholder="First name"
          onChange={handleLastName}
          value={lastName}
        />
      </div> */}
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
        <label className={styles.label}>Username</label>
        <input
          className="form-control"
          placeholder="Username"
          onChange={handleUserName}
          value={username}
        />
      </div>
      <div className="mb-3">
        <label className={styles.label}>Role</label>
        <select
          className="form-select"
          aria-label="Select role"
          onChange={handleRole}
          value={role}
        >
          {/* <option value="">Select role</option> */}
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>
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
      {error && (
        <div className="alert alert-danger" role="alert">
          Please fill in all fields
        </div>
      )}
      <div className="d-grid">
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}
