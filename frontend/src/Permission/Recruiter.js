import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import apiList from "../lib/apiList";

import axios from 'axios';
import { SetPopupContext } from "../App";


const useStyles = makeStyles((theme) => ({
  recruiterCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.primary.main}`,
    width: "200%",
    margin: "auto",
    marginLeft: "-150px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
  },
  containedButton: {
    backgroundColor: "#47df9d",
    "&:hover": {
      backgroundColor: "#3daf7d",
    },
  },
}));

const Recruiters = () => {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    fetch(apiList.getRecruiter, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) setdata(data);
      });
  }, []);

  function verify(userId, status) {
    fetch(apiList.verify, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: userId, status }),
    })
      .then((res) => res.json())
      .then((result) => {
        let newData = data.map((recruiter) => {
          if (recruiter._id === result.id) {
            return {
              ...recruiter,
              status: result.status,
            };
          }
          return recruiter;
        });
        setdata(newData);
      });
  }

  //new function added for downloading verification document  -----------------    change ---------------------
  const getVerificationDocument = (recruiter) => {
    console.log(">>>>>>>>>>", recruiter);
    if (
      recruiter &&
      recruiter.verificationDocument &&
      recruiter.verificationDocument !== ""
    ) {
      window.open(apiList.getVerificationDocument(recruiter._id));
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No verification document found",
      });
    }
  };

  return (
    <div>
      {data.map((recruiter) => (
        <Card key={recruiter._id} className={classes.recruiterCard}>
          <Typography variant="h6">{recruiter.email}</Typography>
          {recruiter.status === "unverified" ? (
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => verify(recruiter._id, "approved")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => verify(recruiter._id, "rejected")}
              >
                Reject
              </Button>

              {/* button  change*/}
              <Button
                variant="contained"
                color="default"
                onClick={() => getVerificationDocument(recruiter)}
                className={classes.containedButton}
              >
                Download Verification Document
              </Button>
            </div>
          ) : (
            <Typography>{recruiter.status}</Typography>
          )}
        </Card>
      ))}
    </div>
  );
}

export default Recruiters;
