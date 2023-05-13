import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: "1rem",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: "2rem",
  },
}));

const ProfileEdit = () => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");

  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div className={classes.root} style={{ marginTop: "100px" }}>
      <Typography variant="h6" style={{ color: "#fff" }}>
        Edit Profile
      </Typography>
      <Avatar alt="Profile Picture" src={avatar} className={classes.avatar} />
      <input
        accept="image/*"
        className={classes.input}
        id="avatar-upload"
        type="file"
        onChange={handleAvatarChange}
      />
      <label htmlFor="avatar-upload">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="resume"
          label="Resume"
          name="resume"
          autoComplete="resume"
          value={resume}
          onChange={handleResumeChange}
        />
        <input
          accept=".pdf"
          className={classes.input}
          id="resume-upload"
          type="file"
          onChange={handleResumeChange}
        />
        <label htmlFor="resume-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
          >
            Upload Resume
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileEdit;
