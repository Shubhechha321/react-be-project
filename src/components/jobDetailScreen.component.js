import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input, List, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ReactMediaRecorder } from "react-media-recorder";
// import { Dropbox } from "dropbox-sdk";


import axios from "axios";
import "./JobDetailScreen.module.css";

const JobDetailScreen = () => {
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const location = useLocation();
  const job = location.state.job;
  // require("isomorphic-fetch"); // or another library of choice.
  // var Dropbox = require("dropbox").Dropbox;
  // var dbx = new Dropbox({
  //   accessToken:
  //     "sl.BePT6pSrfcjZjNzhOEJK5CjiN8OZUbPDVTHBvozG1LDBfRtjYlcZGuHfVZbl9j_fcn4wkkvcyTw5erMXO-kyTCJiU05cp0eCr88uZO46xaHjRVSuFTndb8A7f9uhB1FOKBM6sxo",
  // });
  // const dbx = new Dropbox({
  //   accessToken:
  //     "sl.BePT6pSrfcjZjNzhOEJK5CjiN8OZUbPDVTHBvozG1LDBfRtjYlcZGuHfVZbl9j_fcn4wkkvcyTw5erMXO-kyTCJiU05cp0eCr88uZO46xaHjRVSuFTndb8A7f9uhB1FOKBM6sxo",
  // });

  const handleShortenUrl = async (originalUrl) => {
    // Convert the base64 string to a Blob object
    const base64String = originalUrl;
    const videoData = base64String.replace(/^data:video\/webm;base64,/, "");
    console.log("videData", videoData);
    const byteCharacters = atob(videoData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "video/webm" });

    // Create a URL object from the Blob
    const videoUrl = URL.createObjectURL(blob);
    console.log("videData", videoUrl);
    return videoUrl;
    // Store the videoUrl in the database
    // ...
  };
  // const uploadFileToDropbox = async (file) => {
  //   const response = await dbx.filesUpload({
  //     path: "/path/to/upload/folder/" + file.name,
  //     contents: file,
  //     mode: { ".tag": "add" },
  //     mute: true,
  //   });
  //   return response.result.id;
  // };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      console.log("video url", fileReader.result);
      setUploadedVideoUrl(fileReader.result);
    };
    setIsRecording(false);
    // console.log(event.target.files[0]);
  };

  const addApplicant = async (jobId, userId) => {
    try {
      // Fetch the current job data
      const response = await fetch(`http://localhost:8800/api/jobs/${jobId}`);
      const jobData = await response.json();

      // Add the new applicant to the applicants array
      const updatedApplicants = [...jobData.applicants, userId];

      // Update the job document with the new array of applicants
      const updateResponse = await fetch(
        `http://localhost:8800/api/jobs/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicants: updatedApplicants }),
        }
      );

      const updatedJobData = await updateResponse.json();
      console.log(updatedJobData);
    } catch (error) {
      console.error(error);
    }
  };

  // const addApplication = async (userId, applicationId) => {
  //   try {
  //     // Fetch the current job data
  //     const response = await fetch(`http://localhost:8800/api/users/${userId}`);
  //     const user = await response.json();

  //     // Add the new applicant to the applicants array
  //     const updatedApplications = [...user.applications, applicationId];

  //     // Update the job document with the new array of applicants
  //     const updateResponse = await fetch(
  //       `http://localhost:8800/api/users/${userId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ applications: updatedApplications }),
  //       }
  //     );

  //     const updatedUserData = await updateResponse.json();
  //     console.log(updatedUserData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const addApplication = async (userId, jobId, applicationId, filename) => {
    // try {
    //   // Fetch the current user data
      const response = await fetch(`http://localhost:8800/api/users/${userId}`);
      const user = await response.json();

    //   // Create a new object with the job id and application id
    //   const newApplication = { [jobId]: vid };

    //   // Add the new application to the applications array
    //   const updatedApplications = [...user.applications, newApplication];

    //   // Update the user document with the new array of applications
    //   const updateResponse = await fetch(
    //     `http://localhost:8800/api/users/${userId}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ applications: updatedApplications }),
    //     }
    //   );

    //   const updatedUserData = await updateResponse.json();
    //   console.log(updatedUserData);
    // } catch (error) {
    //   console.error(error);
    // }
      const updatedResponse = await fetch(
        `http://localhost:8800/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applications: [
              ...user.applications,
              {
                jobid: jobId,
                jobrole: job.title,
                filename: filename,
                videodest: applicationId,
              },
            ],
          }),
        }
      );
      const data = await updatedResponse.json();
      console.log(data);
  };


  const handleSubmit = async (file) => {
    let videoUrl = "";
    const userId = String(localStorage.getItem("userId")).trim();

    if (uploadedVideoUrl) {
      videoUrl = uploadedVideoUrl;
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(uploadedFile);
      // reader.onload = async () => {
      //   const buffer = new Uint8Array(reader.result);
      //   const formData = new FormData();
      //   formData.append("jobId", job._id);
      //   formData.append("applicantId", userId);
      //   // formData.append("video", new Blob([buffer], { type: "video/mp4" }));
      //   formData.append("videoUrl", uploadedVideoUrl);
      //   formData.append("status", "applied");
      //   const res = await fetch(
      //     `http://localhost:8800/api/jobs/${job._id}/application`,
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   );
      //   console.log("response", res);
      // };
      const data = new FormData();
      data.append("file", uploadedFile);
      const response = await axios.post(
        "http://localhost:8800/api/upload",
        data,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.destination);
          const response2 = await fetch(
            `http://localhost:8800/api/jobs/${job._id}/application`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                applicantId: userId,
                jobId: job._id,
                videoDest: response.data.destination,
                filename: response.data.filename,
                status: "applied",
              }),
            }
          )
            .then((response2) => response2.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
            addApplication(userId, job._id, response.data.destination, response.data.filename);
            addApplicant(job._id, userId);
            setVideoUploaded(true);
    } else if (recordedVideoUrl) {
      videoUrl = recordedVideoUrl;
      // const formData = new FormData();
      // formData.append("jobId", job._id);
      // formData.append("applicantId", userId);
      // // formData.append("video", new Blob([buffer], { type: "video/mp4" }));
      // formData.append("videoUrl", recordedVideoUrl, "video.mp4");
      // formData.append("status", "applied");
      // const res = await fetch(
      //   `http://localhost:8800/api/jobs/${job._id}/application`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      // console.log("response", res);
      // await handleShortenUrl(videoUrl);
    }
//     const response = await fetch(
//       `http://localhost:8800/api/jobs/${job._id}/application`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           applicantId: userId,
//           jobId: job._id,
//           videoUrl: videoUrl.toString(),
//           status: "applied",
//         }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));

// console.log(response);
    // if(response!= null) 


    
    console.log("shortened URL", uploadedFile);
  };
  const handleDelete = () => {
    setUploadedVideoUrl("");
    setRecordedVideoUrl("");
  };
const onChangeHandler = event => {
  setSelectedFile(event.target.files[0]);
  // const data = new FormData();
  // data.append("file", selectedFile);
  // axios.post("http://localhost:8800/api/upload", data, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  // var url = URL.createObjectURL((event.target.files[0]).originFileObj);
  // setUploadedVideoUrl(url);
  // console.log("hi",event.target.files[0]);
};
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      videoRef.current.srcObject = null;
    }
  };
  if (isRecording === true) {
  }
  return (
    <div className="job-detail-screen-container">
      <div
        style={{
          marginTop: "100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <div
          style={{
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            margin: "16px",
            maxWidth: "1200px",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              margin: "24px",
              textAlign: "center",
            }}
          >
            {job.companyName}
          </h1>
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              margin: "0 24px 16px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {job.title}
          </h2>
          <p
            style={{
              color: "white",
              fontSize: "14px",
              margin: "0 24px 16px",
            }}
          >
            {job.desc}
          </p>
          <h3
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "24px",
            }}
          >
            Responsibilities:
          </h3>
          <ul
            style={{
              color: "white",
              fontSize: "14px",
              listStyle: "disc",
              margin: "0 24px 24px",
              paddingLeft: "24px",
            }}
          >
            {job.responsibilities.map((responsibility) => (
              <li
                style={{ marginBottom: "8px", color: "white" }}
                key={responsibility}
              >
                {responsibility}
              </li>
            ))}
          </ul>
          <h3
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "24px",
            }}
          >
            Requirements:
          </h3>
          <ul
            style={{
              color: "white",
              fontSize: "14px",
              listStyle: "disc",
              margin: "0 24px 24px",
              paddingLeft: "24px",
            }}
          >
            {job.requirements.map((requirement) => (
              <li
                style={{ marginBottom: "8px", color: "white" }}
                key={requirement}
              >
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "-1",
            opacity: "0.4",
          }}
        >
          <img
            style={{
              borderRadius: "4px",
              height: "130%",
              maxWidth: "120%",
              objectFit: "cover",
            }}
            src={job.url}
            alt={job.companyName}
          />
        </div>
      </div>

      {uploadedVideoUrl || recordedVideoUrl ? (
        <div
          className="job-detail-screen-video"
          style={{ marginTop: "90px", marginBottom: "50px" }}
        >
          <h2 style={{ color: "white" }}>Recorded Video:</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              margin: "20px",
              alignItems: "center",
            }}
          >
            <video controls>
              <source
                src={uploadedVideoUrl ? uploadedVideoUrl : recordedVideoUrl}
                width="320"
                height="240"
                type="video/mp4"
              />
            </video>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleSubmit} style={{ marginRight: "20px" }}>
                Submit Video
              </Button>
              {videoUploaded && <p>Video uploaded successfully!</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="job-detail-screen-video" style={{ marginTop: "70px" }}>
          <h2 style={{ color: "white" }}>Record/Upload Video:</h2>
          <div>
            <p>
              Please record a 15 second video response to the questions above:
            </p>
            {/* <input type="file" name="file" onChange={onChangeHandler} /> */}
            <Upload
              name="video"
              accept="video/*"
              beforeUpload={handleFileUpload}
              showUploadList={false}
            >
              {/* <input type="file" name="file" onChange={onChangeHandler} /> */}
              <Button icon={<UploadOutlined />}>Upload Video</Button>
            </Upload>
            <ReactMediaRecorder
              video
              render={({
                status,
                startRecording,
                stopRecording,
                mediaBlobUrl,
              }) => (
                <>
                  <div
                    style={{
                      marginBottom: "16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {status !== "recording" && (
                      <Button
                        className="job-detail-screen-record-btn"
                        onClick={() => {
                          startRecording();
                          startVideo();
                        }}
                      >
                        Record Video
                      </Button>
                    )}
                    {status === "recording" && (
                      <Button
                        className="job-detail-screen-record-btn"
                        onClick={() => {
                          stopRecording();
                          stopVideo();
                        }}
                      >
                        Stop Recording
                      </Button>
                    )}
                    {/* {status === "recording" && <div>Recording...</div>} */}
                    {status === "recording" && (
                      <video ref={videoRef} width={300} height={200} />
                    )}
                    {uploadedVideoUrl ? (
                      <video controls>
                        <source
                          src={uploadedVideoUrl}
                          width="320"
                          height="240"
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <>
                        {setRecordedVideoUrl(mediaBlobUrl)}
                        {status === "stopped" && (
                          <video controls>
                            <source
                              src={mediaBlobUrl}
                              width="320"
                              height="240"
                              type="video/mp4"
                            />
                          </video>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
              onRecordingComplete={(videoBlob) => {
                setIsRecording(false);
                const formData = new FormData();
                formData.append("video", videoBlob);
                console.log("video url new", videoBlob);
                fetch("http://localhost:8800/api/api/upload", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setUploadedVideoUrl(data.url);
                    console.log("video url", data.url);
                  })
                  .catch((error) => {
                    console.error("Error uploading video.", error);
                  });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailScreen;
