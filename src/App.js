import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import DashBoard from "./components/dashboard.component";
import Jobs from "./components/jobs.component";
import JobDetailScreen from "./components/jobDetailScreen.component";
import RecruiterJobs from "./components/recruiterJobs.component";
import CandidateList from "./components/candidateList.component";
import Candidate from "./components/candidate.component";
import { slide as Menu } from "react-burger-menu";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import useToken from "./useToken";
import useRole from "./useRole";
import Sidebar from "./components/sidemenu.component";
import AboutUs from "./components/about.component";
import StaticFaqSection from "./components/faq.component";
import ProfileEdit from "./components/profile.component";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  function handleLogout() {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.href = "/";
    // add any other necessary logout functionality here
  }

  if (localStorage.getItem("token") === null) {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                HireHub
              </Link>

              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Login setToken={setToken} setRole={setRole} />}
                />

                <Route
                  path="/sign-in"
                  // element={<Login setToken={""} setRole={""} />}
                  element={<Login setToken={setToken} setRole={setRole} />}
                />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  } else if (localStorage.getItem("role").includes("applicant")) {
    console.log("role: ", localStorage.getItem("role"));
    console.log("token appl: ", localStorage.getItem("token"));
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Sidebar />
              <Link className="navbar-brand" to={"/jobs"}>
                HireHub
              </Link>
              <ul className="navbar-nav ml-auto">
                {localStorage.getItem("role") !== null && (
                  <li className="nav-item ml-auto">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Jobs />} />
                <Route path="/profile" element={<ProfileEdit />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/about-us/faq" element={<StaticFaqSection />} />
                <Route exact path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetailScreen />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  } else if (localStorage.getItem("role").includes("recruiter")) {
    console.log("role: ", localStorage.getItem("role"));
    console.log("token recr: ", localStorage.getItem("token"));
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              {/* <div className="side-menu">
                <button className="hamburger" onClick={toggleMenu}>
                  {isOpen ? <AiOutlineClose /> : <FaBars />}
                </button>
                <div className={`menu ${isOpen ? "open" : ""}`}>
                  <ul>
                    <li>Profile</li>
                    <li>Jobs</li>
                    <li>Settings</li>
                    <li>Logout</li>
                  </ul>
                </div>
              </div> */}
              <Sidebar />
              <Link className="navbar-brand" to={"/recruiterJobs"}>
                HireHub
              </Link>
              <ul className="navbar-nav ml-auto">
                {localStorage.getItem("role") !== null && (
                  <li className="nav-item ml-auto">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<RecruiterJobs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/about-us/faq" element={<StaticFaqSection />} />
                <Route path="/recruiterJobs" element={<RecruiterJobs />} />
                <Route
                  path="/recruiterJobs/:jobTitle"
                  element={<CandidateList />}
                />
                <Route
                  path="/recruiterJobs/:jobId/:candidateId"
                  element={<Candidate />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
