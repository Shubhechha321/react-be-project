import React, { useState, useEffect } from "react";
import { Button, Card, Input, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";
import "./Candidate.module.css";

const { TextArea } = Input;

const Candidate = () => {
  const [dataCandidate, setData] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDest, setVideoDest] = useState(null);
  const [file, setFile] = useState(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [mp4Url, setMp4Url] = useState("");
  const location = useLocation();
  const candidate = location.state.job;
  console.log(candidate);
  const { jobId, candidateId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8800/api/users/${candidateId}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8800/api/users/${jobId}/videodest`
      );
      const data = await response.json();
      // setVideoUrl(data.videodest);
      console.log("vid", data);
      setVideoUrl(`file:///${data.videodest}/${data.filename}`);
      console.log("video", videoUrl);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Trait",
      dataIndex: "trait",
      key: "trait",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    {
      key: "1",
      trait: "Openness",
      value: "0.8",
    },
    {
      key: "2",
      trait: "Conscientiousness",
      value: "0.6",
    },
    {
      key: "3",
      trait: "Extraversion",
      value: "0.5",
    },
    {
      key: "4",
      trait: "Agreeableness",
      value: "0.4",
    },
    {
      key: "5",
      trait: "Neuroticism",
      value: "0.3",
    },
  ];

  const handleVideoChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleUpload = () => {
    setIsUploading(true);

    // TODO: call API to upload video
    setTimeout(() => {
      setUploadStatus("Video uploaded successfully!");
      setIsUploading(false);
    }, 2000);
  };

  const handleVideoExpand = () => {
    setIsVideoExpanded(!isVideoExpanded);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div>{dataCandidate.name}</div>
      <div className="video-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <ReactPlayer
            className={`react-player ${isVideoExpanded ? "expanded" : ""}`}
            // url={"https://youtu.be/vx6MCEqGHR4"}
            url={videoUrl}
            controls={true}
          />
        </div>
      </div>
      <Card className="upload-card" style={{ marginBottom: "20px" }}>
        <p>Upload to get a detailed analysis</p>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleUpload}
          loading={isUploading}
        >
          Upload
        </Button>
      </Card>
      {uploadStatus && (
        <Card className="analysis-card">
          <h3>Video Analysis</h3>
          <p>{uploadStatus}</p>
          <Table
            columns={columns}
            dataSource={data}
            style={{ marginTop: "20px" }}
          />

          <p>Analysis of the video will be displayed here.</p>
          <p>Make sure the text is attractive and easy to read.</p>
        </Card>
      )}
    </div>
  );
};

export default Candidate;
