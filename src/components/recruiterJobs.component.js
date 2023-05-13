import React, { useState, useEffect } from "react";
import "./RecruiterJobs.module.css";
import { Link } from "react-router-dom";
import { Card, Button, Input, Space } from "antd";
// import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./SignupSignIn.module.css";
const { Meta } = Card;

function CardList() {
  var jobData = [];
  const [jobs, setJobs] = useState(jobData);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [error, setError] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const userId = String(localStorage.getItem("userId")).trim();

  useEffect(() => {
    fetch(`http://localhost:8800/api/jobs/recruiter/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const handleClick = (id) => {
    console.log(`Clicked on company ${id}`);
  };

  const handlePostJobsClick = () => {
    setShowForm(true);
    setShowButton(false);
  };
  // Handling the email change
  const handleRole = (e) => {
    setJobRole(e.target.value);
    setSubmitted(false);
  };

  const handleDesc = (e) => {
    setJobDesc(e.target.value);
    setSubmitted(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    setShowForm(false);
    setShowButton(true);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr" }}>
        <div></div>
        <h2 style={{ textAlign: "center", color: "#e6e6e6" }}>
          Recruiter Jobs
        </h2>
        {showButton && (
          <Button style={{ justifySelf: "end" }} onClick={handlePostJobsClick}>
            Post Jobs
          </Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "100px",
          }}
        >
          <h3 className={styles.heading}>Job details</h3>
          <div className="mb-3">
            <label className={styles.label}>Job Role</label>
            <input
              className="form-control"
              placeholder="Enter job role"
              onChange={handleRole}
              value={jobRole}
            />
          </div>
          <div className="mb-3">
            <label className={styles.label}>Job description</label>
            <input
              className="form-control"
              placeholder="Enter password"
              onChange={handleDesc}
              value={jobDesc}
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
              Submit
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            gap: "20px",
            margin: "20px",
          }}
        >
          {jobs.map((recruiterJob) => (
            <Link
              to={`/recruiterJobs/${recruiterJob._id}`}
              state={{ recruiterJob }}
              style={{ textDecoration: "none", color: "ButtonText" }}
            >
              <Card
                key={recruiterJob._id}
                onClick={() => handleClick(recruiterJob.title)}
                style={{ width: "100%" }}
              >
                <Meta
                  style={{ textAlign: "start" }}
                  // avatar={<Avatar src={company.profilePhoto} />}
                  title={recruiterJob.title}
                  description={recruiterJob.desc}
                />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardList;
