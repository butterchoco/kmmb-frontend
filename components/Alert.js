import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState, useEffect } from "react";
import shadows from "@material-ui/core/styles/shadows";

function Notif(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = ({ variant, message, setMessage }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };

  return (
    <Snackbar
      open={message !== undefined && message !== ""}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Notif onClose={handleClose} severity={variant}>
        {message}
      </Notif>
    </Snackbar>
  );
};

export default Alert;
