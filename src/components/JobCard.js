import React from "react";

export default function JobCard(props) {
  const { job } = props;

  const handleClick = () => {
    // Handle click on job card
  };

  return (
    <div onClick={handleClick}>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
    </div>
  );
}
