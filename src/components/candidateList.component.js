import React from "react";
import { Card, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Meta } = Card;

const candidates = [
  {
    id: 1,
    name: "John Doe",
    about: "I have 3 years experience",
    profilePhoto: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    about: "Have worked in big companies like apple",
    profilePhoto: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Bob Johnson",
    about: "Hello, I have been in this field for 5 years",
    profilePhoto: "https://i.pravatar.cc/150?img=3",
  },
];

const CandidateList = () => {
  const location = useLocation();
  const currentPathname = location.pathname;

  const newPathname = "";

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#e6e6e6", marginTop: "100px" }}>
        Candidates for UI/UX Designer role in ABC Inc.
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
              pathname: `${location.pathname}/${candidate.id}`,
              state: { candidate },
            }}
            state={{ candidate }}
            style={{ textDecoration: "none", color: "ButtonText" }}
          >
            <Card key={candidate.id} style={{ width: "100%" }}>
              <Meta
                style={{ textAlign: "start" }}
                avatar={<Avatar src={candidate.profilePhoto} />}
                title={candidate.name}
                description={candidate.about}
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
