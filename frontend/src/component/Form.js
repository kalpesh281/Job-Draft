import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { SetPopupContext } from "../App";

import apiList, { server } from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institutionName: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  return (
    <>
      {education.map((edu, index) => (
        <fieldset key={index} className={classes.inputBox}>
          <legend>Education Detail {index + 1}</legend>
          <Grid
            item
            container
            className={classes.inputBox}
            key={index}
            spacing={2}
          >
            <Grid item xs={3}>
              <TextField
                label="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={`Institution Name #${index + 1}`}
                value={edu.institutionName}
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "institutionName",
                    e.target.value
                  )
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Start Year"
                value={edu.startYear}
                variant="outlined"
                type="number"
                onChange={(e) =>
                  handleEducationChange(index, "startYear", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="End Year"
                value={edu.endYear}
                variant="outlined"
                type="number"
                onChange={(e) =>
                  handleEducationChange(index, "endYear", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </fieldset>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={addEducation}
          className={classes.inputBox}
        >
          Add another education details
        </Button>
      </Grid>
    </>
  );
};

const MultifieldProjectInput = (props) => {
  const classes = useStyles();
  const { projects, setProjects } = props;

  return (
    <>
      {projects.map((project, key) => (
        <fieldset key={key} className={classes.inputBox}>
          <legend>Project {key + 1}</legend>
          <Grid
            item
            container
            className={classes.inputBox}
            key={key}
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                label={`Project Title #${key + 1}`}
                value={projects[key].title}
                onChange={(event) => {
                  const newProjects = [...projects];
                  newProjects[key].title = event.target.value;
                  setProjects(newProjects);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`Description #${key + 1}`}
                value={projects[key].description}
                onChange={(event) => {
                  const newProjects = [...projects];
                  newProjects[key].description = event.target.value;
                  setProjects(newProjects);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`Link #${key + 1}`}
                value={projects[key].link}
                onChange={(event) => {
                  const newProjects = [...projects];
                  newProjects[key].link = event.target.value;
                  setProjects(newProjects);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </fieldset>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setProjects([
              ...projects,
              {
                title: "",
                description: "",
                link: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another project details
        </Button>
      </Grid>
    </>
  );
};

const Form = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [formDetails, setFormDetails] = useState({
    name: "",
    summary: "",
    email: "",
    location: "",
    contactNumber: "",
    education: [
      {
        institutionName: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        link: "",
      },
    ],
    skills: [],
  });

  const handleInput = (key, value) => {
    setFormDetails({
      ...formDetails,
      [key]: value,
    });
  };

  const handleCreateResume = async () => {
    try {
      const response = await axios.post(apiList.resume, formDetails);
      console.log("--------------", response);
      const { message, pdfPath } = response.data;
      alert(message);

      // Show success message
      setPopup({
        open: true,
        severity: "success",
        message: message,
      });

      const pdfUrl = `${server}${pdfPath}`;
      window.open(pdfUrl, "_blank");
      return pdfUrl;
    } catch (error) {
      // Handle errors
      console.error("Error creating resume:", error);
      setPopup({
        open: true,
        severity: "error",
        message: "Failed to create resume",
      });
    }
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item xs>
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container direction="column" alignItems="" spacing={3}>
              <Grid item container justify="center">
                <Typography
                  variant="h3"
                  style={{ color: "#3f51b5", fontWeight: "bold" }}
                >
                  Create Resume
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Name"
                  value={formDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Summary"
                  value={formDetails.summary}
                  onChange={(event) =>
                    handleInput("summary", event.target.value)
                  }
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid style={{ display: "flex" }}>
                <Grid
                  item
                  xs={4}
                  style={{ marginLeft: "14px", marginRight: "22px" }}
                >
                  <TextField
                    label="Email"
                    value={formDetails.email}
                    onChange={(event) =>
                      handleInput("email", event.target.value)
                    }
                    className={classes.inputBox}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    marginRight: "22px",
                  }}
                >
                  <PhoneInput
                    country={"in"}
                    value={formDetails.contactNumber}
                    onChange={(phone) =>
                      handleInput("contactNumber", `+${phone}`)
                    }
                  />
                </Grid>

                <Grid item xs={4} style={{ paddingRight: "25px" }}>
                  <TextField
                    label="Location"
                    value={formDetails.location}
                    onChange={(event) =>
                      handleInput("location", event.target.value)
                    }
                    className={classes.inputBox}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <MultifieldInput
                education={formDetails.education}
                setEducation={(education) =>
                  setFormDetails({ ...formDetails, education })
                }
              />
              <MultifieldProjectInput
                projects={formDetails.projects}
                setProjects={(projects) =>
                  setFormDetails({ ...formDetails, projects })
                }
              />
              <Grid item>
                <ChipInput
                  className={classes.inputBox}
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={formDetails.skills}
                  onAdd={(chip) =>
                    setFormDetails({
                      ...formDetails,
                      skills: [...formDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = [...formDetails.skills];
                    skills.splice(index, 1);
                    setFormDetails({
                      ...formDetails,
                      skills,
                    });
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: "10px 50px",
                marginTop: "30px",
                borderRadius: "8px",
                height: "50px",
              }}
              onClick={handleCreateResume}
            >
              Create
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
