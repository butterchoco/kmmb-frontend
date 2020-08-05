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
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const links = [
    { name: "Tentang Kami", to: "#aboutLandingPage" },
    { name: "Acara", to: "#eventLandingPage" },
    { name: "Timeline", to: "#timelineLandingPage" },
  ];
  const [mobileNavShow, setMobileNavShow] = useState(false);

  return (
    <div>
      <AppBar elevation={0} color="inherit">
        <Toolbar>
          <Typography>
            <img
              style={{ height: "42px" }}
              src="/images/logo_KMMB.png"
              alt="logo_KMMB"
            />
          </Typography>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div className="navbar__link">
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
            </div>
            <button className="navbar__daftar primary">Daftar</button>
            <button
              className="navbar__more basic"
              onClick={() => setMobileNavShow(!mobileNavShow)}
            >
              {mobileNavShow ? (
                <span className="material-icons">close</span>
              ) : (
                <span className="material-icons">dehaze</span>
              )}
            </button>
          </div>
        </Toolbar>
      </AppBar>
      <Slide
        className="navbar--mobile"
        appear={false}
        direction="down"
        in={mobileNavShow}
      >
        <AppBar elevation={0} color="inherit">
          <Toolbar>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="navbar__link--mobile">
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
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  );
};

export default Navbar;
