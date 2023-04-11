import React, { useState } from "react";
import { Upload, Button } from "antd";
import { Player } from "video-react";

export default function Dashboard(props) {
  const [videoSrc, seVideoSrc] = useState("");

  const handleChange = ({ file }) => {
    var reader = new FileReader();
    console.log(file);
    var url = URL.createObjectURL(file.originFileObj);
    seVideoSrc(url);
  };

  return (
    <React.Fragment>
      <div className="action">
        <Upload
          className="mt-3 mb-3"
          accept=".mp4"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          //   maxCount={1}
          onChange={handleChange}
        >
          <Button>Upload</Button>
        </Upload>

        {/* <Player
          playsInline
          src={videoSrc}
          fluid={false}
          width={10}
          height={4}
        /> */}
      </div>
    </React.Fragment>
  );
}
