import React from "react";
import { Row, Col, Image } from "antd";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles.container}>
      <h1>About HireHub</h1>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={8}>
          <Image
            src={
              "https://images.unsplash.com/photo-1653669486779-671f54d26c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGpvYiUyMHBvcnRhbCUyMGltYWdlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            }
            preview={false}
          />
        </Col>
        <Col xs={24} sm={24} md={16}>
          <h2>Our Mission</h2>
          <p>
            At HireHub, we are committed to connecting talented job seekers with
            reputable employers in a seamless and efficient way. Our platform
            makes it easy for candidates and recruiters to register, login, and
            find jobs or candidates, all in one place.
          </p>
          <p>
            We believe that finding the right job or employee should be simple
            and stress-free, which is why we have designed our platform to be
            user-friendly and intuitive.
          </p>
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={16}>
          <h2>Our History</h2>
          <p>
            HireHub was founded in 2019 by a team of experienced recruiters and
            software developers who recognized the need for a better way to
            connect job seekers with employers.
          </p>
          <p>
            Since our launch, we have helped thousands of candidates find their
            dream jobs and have helped countless employers find the right
            candidates to fill their open positions.
          </p>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Image
            src={
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8am9iJTIwcG9ydGFsJTIwaW1hZ2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            }
            preview={false}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={8}>
          <Image
            src={
              "https://media.istockphoto.com/id/530685719/photo/group-of-business-people-standing-in-hall-smiling-and-talking-together.jpg?b=1&s=170667a&w=0&k=20&c=cc7oW7ro6P2_Vh0zpNNMpuxVXZW_huKxSDyyXM5dOLU="
            }
            preview={false}
          />
        </Col>
        <Col xs={24} sm={24} md={16}>
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced recruiters, software developers,
            and designers who are passionate about helping job seekers and
            employers succeed.
          </p>
          <p>
            We work tirelessly to improve our platform and provide the best
            possible user experience for our users.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUs;
