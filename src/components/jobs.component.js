import React, { useState, useRef } from "react";
import { Card, Button, Input, Space } from "antd";
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Jobs.module.css";

const { Meta } = Card;

const JobCard = ({ job, onApply }) => {
  const handleClick = () => {
    // handle card click
  };

  const handleApply = () => {
    onApply(job.id);
  };

  return (
    <Link
      to={`/jobs/${job.id}`}
      state={{ job }}
      style={{ textDecoration: "none", color: "ButtonText" }}
    >
      <Card
        hoverable
        style={{
          width: 320,
          margin: "0 24px 24px 0",
          marginLeft: "40px",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
        className="job-card"
        onClick={handleClick}
        cover={
          <div
            style={{
              height: "240px",
              backgroundImage: `url('https://picsum.photos/320/240?random=${job.id}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        }
      >
        <div style={{ padding: "16px" }}>
          <Meta title={job.title} description={job.company} />
          <p style={{ marginTop: "8px", fontSize: "18px", color: "#666" }}>
            {job.description}
          </p>
        </div>
        <div style={{ borderTop: "1px solid #eee", padding: "16px" }}>
          <Button type="link" onClick={handleClick}>
            Apply
          </Button>
        </div>
      </Card>
    </Link>
  );
};
const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "ABC Inc.",
    questions: [
      "What is your experience with React?",
      "Why do you want to work with us?",
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "XYZ Corp.",
    questions: [
      "What is your experience with React?",
      "Why do you want to work with us?",
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "123 LLC",
    questions: [
      "What is your experience with React?",
      "Why do you want to work with us?",
    ],
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Acme Co.",
    questions: [
      "What is your experience with React?",
      "Why do you want to work with us?",
    ],
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Big Corp.",
    questions: [
      "What is your experience with React?",
      "Why do you want to work with us?",
    ],
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(jobData);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef(null);
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  const handleApply = (jobId) => {
    setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobId]);
  };

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobs(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    setJobs(jobData);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <Button type="text" className="prev" onClick={handlePrev}>
        <LeftOutlined />
      </Button>
    ),
    nextArrow: (
      <Button type="text" className="next" onClick={handleNext}>
        <RightOutlined />
      </Button>
    ),
  };
  return (
    <div className="jobs-container">
      <h1 className="jobs-title">Find Your Dream Job</h1>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for jobs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{
            marginInline: "10px",
            color: "#1C8EF9",
            background: "#ffffff",
          }}
        >
          Search
        </Button>
        <Button className="reset-btn" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {/* <div className="jobs-list" style={{ display: "flex", flexWrap: "wrap" }}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={handleApply} />
        ))}
      </div> */}
      <Slider
        {...settings}
        ref={sliderRef}
        style={{ marginLeft: "36px", width: "95%" }}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={handleApply} />
        ))}
      </Slider>

      {/* <div className="applied-jobs">
        <h2>Applied Jobs</h2>
        {appliedJobs.length === 0 && <p>No applied jobs yet.</p>}
        {appliedJobs.map((jobId) => (
          <p key={jobId}>Job ID {jobId}</p>
        ))}
      </div> */}
    </div>
  );
};

export default Jobs;
