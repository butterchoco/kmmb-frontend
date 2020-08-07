import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import RegisterBase from "./Register/RegisterBase";
import LoginBase from "./Login/LoginBase";
import { useState } from "react";

const Register = ({ setRegisterShow }) => {
  const [isRegisterComponent, setIsRegisterComponent] = useState(true);

  return (
    <div className="fullscreenModal">
      <button
        className="basic fullscreenModal__close"
        onClick={() => setRegisterShow(false)}
      >
        <span className="material-icons">close</span>
      </button>
      <h2 className="fullscreenModal__title">Daftar KMMB 2020</h2>
      <div className="fullscreenModal__content">
        {isRegisterComponent ? (
          <RegisterBase setIsRegisterComponent={setIsRegisterComponent} />
        ) : (
          <LoginBase setIsRegisterComponent={setIsRegisterComponent} />
        )}
      </div>
    </div>
  );
};

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
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const [registerShow, setRegisterShow] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Navbar setRegisterShow={setRegisterShow} />
      <span id="back-to-top-anchor"></span>
      {registerShow ? <Register setRegisterShow={setRegisterShow} /> : children}
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
