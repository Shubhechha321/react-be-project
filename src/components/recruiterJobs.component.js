// import React, { useState, useEffect } from "react";
// import "./RecruiterJobs.module.css";

// const jobData = [
//   {
//     id: 1,
//     title: "Software Engineer",
//     location: "San Francisco, CA",
//     datePosted: "May 10, 2023",
//   },
//   {
//     id: 2,
//     title: "Front-end Developer",
//     location: "New York, NY",
//     datePosted: "May 12, 2023",
//   },
//   {
//     id: 3,
//     title: "UX Designer",
//     location: "Los Angeles, CA",
//     datePosted: "May 15, 2023",
//   },
//   {
//     id: 4,
//     title: "Data Analyst",
//     location: "Chicago, IL",
//     datePosted: "May 18, 2023",
//   },
//   {
//     id: 5,
//     title: "Product Manager",
//     location: "Seattle, WA",
//     datePosted: "May 20, 2023",
//   },
// ];

// function RecruiterJobs() {
//   const [jobs, setJobs] = useState(jobData);

//   useEffect(() => {
//     fetch("your_backend_api_url")
//       .then((response) => response.json())
//       .then((data) => setJobs(data))
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div className="recruiter-jobs">
//       <h1>Recruiter Jobs</h1>
//       <ul>
//         {jobs.map((job) => (
//           <li key={job.id} onClick={() => handleJobClick(job.id)}>
//             <h2>{job.title}</h2>
//             <p>{job.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   function handleJobClick(jobId) {
//     // Handle job click event
//   }
// }

// export default RecruiterJobs;

// import React from "react";
// import "./card.css"; // import your css file

// const jobList = [
//   {
//     id: 1,
//     company: "Company A",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae mauris bibendum, eleifend enim sed, pulvinar elit. In a nisi vel odio semper ultrices. Donec nec augue ante.",
//     applicants: 23,
//   },
//   {
//     id: 2,
//     company: "Company B",
//     description:
//       "Pellentesque ullamcorper, ex a dapibus consectetur, arcu urna varius augue, id rhoncus odio turpis in sapien. Aliquam pretium urna non sapien aliquam, ac vestibulum augue mollis. Nunc nec tellus lorem. Vivamus convallis purus vel sodales venenatis. Fusce finibus mi vel ipsum efficitur aliquet. ",
//     applicants: 10,
//   },
//   {
//     id: 3,
//     company: "Company C",
//     description:
//       "Suspendisse a dolor sit amet mi finibus consequat. Suspendisse vel nisi nec nulla bibendum dictum. Donec accumsan convallis lacus, vitae dignissim metus. Integer sem sapien, ullamcorper eu lectus sed, fringilla facilisis elit. Morbi fermentum lacinia orci, eu euismod elit. Ut convallis felis vitae ex venenatis faucibus. ",
//     applicants: 5,
//   },
// ];

// const Card = ({ id, company, description, applicants }) => {
//   const handleClick = () => {
//     console.log(`Clicked on card ${id}`);
//   };

//   return (
//     <div className="card" onClick={handleClick}>
//       <h2>{company}</h2>
//       <p className="description">{description}</p>
//       <p className="applicants">
//         {applicants} people have applied for this job.
//       </p>
//       <p className="content">Add some more content here if needed.</p>
//     </div>
//   );
// };

// const JobList = () => {
//   return (
//     <div className="job-list">
//       {jobList.map((job) => (
//         <Card
//           key={job.id}
//           id={job.id}
//           company={job.company}
//           description={job.description}
//           applicants={job.applicants}
//         />
//       ))}
//     </div>
//   );
// };

// export default JobList;

import React from "react";
import "./RecruiterJobs.module.css";
import { Link } from "react-router-dom";
import { Card, Button, Input, Space } from "antd";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
const { Meta } = Card;
function CardList() {
  const companies = [
    {
      id: 1,
      name: "Company A",
      jobTitle: "UI-UX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      applicants: 10,
    },
    {
      id: 2,
      name: "Company B",
      jobTitle: "Web Developer",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      applicants: 5,
    },
    {
      id: 3,
      name: "Company C",
      jobTitle: "Web Developer",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      applicants: 3,
    },
  ];

  const handleClick = (id) => {
    console.log(`Clicked on company ${id}`);
  };

  return (
    // <div className="card-list">
    //   <h1>Recruiter Jobs</h1>

    //   {companies.map((company) => (
    //     <Link
    //       to={`/recruiterJobs/${company.id}`}
    //       state={{ company }}
    //       style={{ textDecoration: "none", color: "ButtonText" }}
    //     >
    //       <div
    //         style={{
    //           margin: "20px",
    //           cursor: "pointer",
    //           padding: "3px",
    //         }}
    //         className="card"
    //         key={company.id}
    //         onClick={() => handleClick(company.id)}
    //       >
    //         <div
    //           className="card-content"
    //           style={{
    //             background: "#DDD",
    //             display: "flex",
    //             flexDirection: "column",
    //             alignContent: "flex-start",
    //             alignItems: "start",
    //             paddingInline: "10px",
    //             paddingTop: "5px",
    //           }}
    //         >
    //           <div
    //             style={{
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //               width: "100%",
    //             }}
    //           >
    //             <h4 className="company-name">{company.name}</h4>
    //             <div style={{ display: "flex", alignItems: "center" }}>
    //               <i
    //                 className="icon-applications"
    //                 style={{ marginRight: "5px" }}
    //               />
    //               <h5 className="applicants-count">{company.applicants}</h5>
    //             </div>
    //           </div>
    //           <p className="company-description">{company.description}</p>
    //         </div>
    //       </div>
    //     </Link>
    //   ))}
    // </div>

    <div>
      <h2 style={{ textAlign: "center", color: "#e6e6e6", marginTop: "100px" }}>
        Recruiter Jobs
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: "20px",
          margin: "20px",
        }}
      >
        {companies.map((company) => (
          <Link
            to={`/recruiterJobs/${company.jobTitle}`}
            state={{ company }}
            style={{ textDecoration: "none", color: "ButtonText" }}
          >
            <Card
              key={company.id}
              onClick={() => handleClick(company.jobTitle)}
              style={{ width: "100%" }}
            >
              <Meta
                style={{ textAlign: "start" }}
                // avatar={<Avatar src={company.profilePhoto} />}
                title={company.jobTitle}
                description={company.description}
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardList;
