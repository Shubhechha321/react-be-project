import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input, List, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ReactMediaRecorder } from "react-media-recorder";

import "./JobDetailScreen.module.css";

const JobDetailScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const location = useLocation();
  const job = location.state.job;

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      console.log("video url", fileReader.result);
      setUploadedVideoUrl(fileReader.result);
    };
    setIsRecording(false);
  };

  const handleSubmit = (file) => {};
  const handleDelete = () => {
    setUploadedVideoUrl("");
    setRecordedVideoUrl("");
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
      <div className="job-detail-screen-header">
        <h1>{job.title}</h1>
        <p>{job.company}</p>
      </div>

      <div className="job-detail-screen-questions">
        <h2 style={{ alignContent: "initial" }}>Questions:</h2>
        <List
          style={{ background: "#FFFFFF", margin: "30px" }}
          bordered
          dataSource={job.questions}
          renderItem={(question) => (
            <List.Item style={{ fontSize: "17px" }}>
              <p>{question}</p>
            </List.Item>
          )}
        />
      </div>

      {uploadedVideoUrl || recordedVideoUrl ? (
        <div className="job-detail-screen-video">
          <h2>Recorded Video:</h2>
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
            </div>
          </div>
        </div>
      ) : (
        <div className="job-detail-screen-video">
          <h2>Record Video:</h2>
          <div>
            <p>
              Please record a 15 second video response to the questions above:
            </p>
            <Upload
              name="video"
              accept="video/*"
              beforeUpload={handleFileUpload}
              showUploadList={false}
            >
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
                console.log("video url");
                setIsRecording(false);
                const formData = new FormData();
                formData.append("video", videoBlob);
                console.log("video url", videoBlob);
                fetch("/api/upload-video", {
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

// import React, { useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { Button, Form, Input, List, message, Upload } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { ReactMediaRecorder } from "react-media-recorder";

// import "./JobDetailScreen.module.css";

// const JobDetailScreen = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
//   const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const location = useLocation();
//   const job = location.state.job;

//   const handleFileUpload = (file) => {
//     setUploadedFile(file);
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => {
//       console.log("video url", fileReader.result);
//       setUploadedVideoUrl(fileReader.result);
//     };
//     setIsRecording(false);
//   };

//   const handleSubmit = (file) => {};
//   const handleDelete = () => {
//     setUploadedVideoUrl("");
//     setRecordedVideoUrl("");
//   };

//   return (
//     <div className="job-detail-screen-container">
//       <div className="job-detail-screen-header">
//         <h1>{job.title}</h1>
//         <p>{job.company}</p>
//       </div>

//       <div className="job-detail-screen-questions">
//         <h2 style={{ alignContent: "initial" }}>Questions:</h2>
//         <List
//           style={{ background: "#FFFFFF", margin: "30px" }}
//           bordered
//           dataSource={job.questions}
//           renderItem={(question) => (
//             <List.Item style={{ fontSize: "17px" }}>
//               <p>{question}</p>
//             </List.Item>
//           )}
//         />
//       </div>

//       {uploadedVideoUrl || recordedVideoUrl ? (
//         <div className="job-detail-screen-video">
//           <h2>Recorded Video:</h2>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "20px",
//               margin: "20px",
//               alignItems: "center",
//             }}
//           >
//             <video controls>
//               <source
//                 src={uploadedVideoUrl ? uploadedVideoUrl : recordedVideoUrl}
//                 width="320"
//                 height="240"
//                 type="video/mp4"
//               />
//             </video>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <Button onClick={handleDelete}>Delete</Button>
//               <Button onClick={handleSubmit} style={{ marginRight: "20px" }}>
//                 Submit Video
//               </Button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="job-detail-screen-video">
//           <h2>Record Video:</h2>
//           <div>
//             <p>
//               Please record a 15 second video response to the questions above:
//             </p>
//             <Upload
//               name="video"
//               accept="video/*"
//               beforeUpload={handleFileUpload}
//               showUploadList={false}
//             >
//               <Button icon={<UploadOutlined />}>Upload Video</Button>
//             </Upload>
//             <ReactMediaRecorder
//               video
//               render={({
//                 status,
//                 startRecording,
//                 stopRecording,
//                 mediaBlobUrl,
//                 previewStream,
//               }) => (
//                 <>
//                   <div
//                     style={{
//                       marginBottom: "16px",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     {status !== "recording" && (
//                       <Button
//                         className="job-detail-screen-record-btn"
//                         onClick={startRecording}
//                       >
//                         Record Video
//                       </Button>
//                     )}
//                     {status === "recording" && (
//                       <Button
//                         className="job-detail-screen-record-btn"
//                         onClick={stopRecording}
//                       >
//                         Stop Recording
//                       </Button>
//                     )}
//                     {status === "recording" && (
//                       <div>
//                         <video
//                           ref={previewStream}
//                           autoPlay
//                           muted
//                           style={{ maxWidth: "100%", maxHeight: "240px" }}
//                         />
//                       </div>
//                     )}
//                     {!isRecording && uploadedVideoUrl && (
//                       <div>
//                         <video
//                           src={uploadedVideoUrl}
//                           controls
//                           style={{ maxWidth: "100%", maxHeight: "240px" }}
//                         />
//                       </div>
//                     )}
//                     {!isRecording && !uploadedVideoUrl && recordedVideoUrl && (
//                       <div>
//                         <video
//                           src={recordedVideoUrl}
//                           controls
//                           style={{ maxWidth: "100%", maxHeight: "240px" }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//               onRecordingComplete={(videoBlob) => {
//                 console.log("video url");
//                 setIsRecording(false);
//                 const formData = new FormData();
//                 formData.append("video", videoBlob);
//                 console.log("video url", videoBlob);
//                 fetch("/api/upload-video", {
//                   method: "POST",
//                   body: formData,
//                 })
//                   .then((response) => response.json())
//                   .then((data) => {
//                     setUploadedVideoUrl(data.url);
//                     console.log("video url", data.url);
//                   })
//                   .catch((error) => {
//                     console.error("Error uploading video.", error);
//                   });
//               }}
//               onGetUserMedia={() => {
//                 setIsRecording(true);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default JobDetailScreen;
