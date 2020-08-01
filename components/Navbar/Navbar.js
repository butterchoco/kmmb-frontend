import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Link from "next/link";
import "./Navbar.scss";
import { useRouter } from "next/router";

const Navbar = ({ children, window }) => {
  const router = useRouter();
  const links = [
    { name: "Tentang Kami", to: "#aboutLandingPage" },
    { name: "Acara", to: "#eventLandingPage" },
    { name: "Timeline", to: "#timelineLandingPage" },
  ];
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const trigger2 = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        elevation={0}
        style={{ backgroundColor: trigger2 ? "white" : "#93F3E7" }}
      >
        <Toolbar id="back-to-top-anchor">
          <Typography>
            <img
              style={{ height: "42px" }}
              src="/images/logo_KMMB.png"
              alt="logo_KMMB"
            />
          </Typography>
          <Typography
            style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            {links.map((data, index) => (
              <Link href={data.to} key={index}>
                <button
                  className={
                    router.pathname == data.to ? "basic secondary" : "basic"
                  }
                >
                  {data.name}
                </button>
              </Link>
            ))}
            <button className="primary">Login</button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
