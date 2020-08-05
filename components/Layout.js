import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import RegisterLoginBase from "./Register/RegisterLoginBase";
import { useState } from "react";

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

const childComponent = (data, children) => {
  switch (data) {
    case "Register":
      return <RegisterLoginBase />;
    default:
      return children;
  }
};

const Layout = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const [childRender, setChildRender] = useState("Register");

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <span id="back-to-top-anchor"></span>
      {childComponent(childRender, children)}
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
