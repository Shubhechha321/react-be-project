import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Meta } = Card;

// const candidates = [
//   {
//     id: 1,
//     name: "John Doe",
//     about: "I have 3 years experience",
//     profilePhoto: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     about: "Have worked in big companies like apple",
//     profilePhoto: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     about: "Hello, I have been in this field for 5 years",
//     profilePhoto: "https://i.pravatar.cc/150?img=3",
//   },
// ];

const CandidateList = () => {
  var candidateData = [];
  const [candidates, setCandidates] = useState(candidateData);
  const location = useLocation();
  const recruiterJob = location.state.recruiterJob;

  useEffect(() => {
    fetch(`http://localhost:8800/api/jobs/${recruiterJob._id}/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => console.error(error));
  }, [recruiterJob._id]);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#e6e6e6", marginTop: "100px" }}>
        Candidates for {recruiterJob.title} role in {recruiterJob.companyName}
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
        {candidates.map((candidate) => (
          <Link
            to={{
              pathname: `${location.pathname}/${candidate._id}`,
              state: { candidate },
            }}
            state={{ candidate }}
            style={{ textDecoration: "none", color: "ButtonText" }}
          >
            <Card key={candidate._id} style={{ width: "100%" }}>
              <Meta
                style={{ textAlign: "start" }}
                avatar={<Avatar src={candidate.profilePicture} />}
                title={candidate.name}
                description={candidate.desc}
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
