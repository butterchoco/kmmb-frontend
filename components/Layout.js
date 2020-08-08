import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import RegisterLoginBase from "./RegisterLoginBase";
import { db, auth } from "./firebase/config";
import Alert from "./Alert";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF7614",
    },
    secondary: {
      main: "#841361",
    },
  },
});

const Layout = (props) => {
  const trigger = useScrollTrigger({
    target: props.window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const [registerShow, setRegisterShow] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Navbar setRegisterShow={setRegisterShow} {...props} />
      <span id="back-to-top-anchor"></span>
      {registerShow ? (
        <RegisterLoginBase setRegisterShow={setRegisterShow} {...props}/>
      ) : (
        props.children
      )}
      {successAlertMessage !== "" ? (
        <Alert
          variant="success"
          message={successAlertMessage}
          setMessage={setSuccessAlertMessage}
        />
      ) : null}
      {errorAlertMessage !== "" ? (
        <Alert
          variant="error"
          message={errorAlertMessage}
          setMessage={setErrorAlertMessage}
        />
      ) : null}
      <Zoom in={trigger}>
        <a
          href="#back-to-top-anchor"
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
          }}
        >
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </a>
      </Zoom>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
