import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Link from "next/link";
import "./Navbar.scss";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();
  const links = [
    { name: "Beranda", to: "/" },
    { name: "about", to: "/about" },
    { name: "acara", to: "/event" },
  ];

  return (
    <AppBar position="sticky" color={"inherit"} elevation={0}>
      <Toolbar id="back-to-top-anchor">
        <Typography></Typography>
        <Typography
          style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
        >
          {links.map((data, index) => (
            <Link href={data.to} key={index}>
              <Button
                size="small"
                className="navbar__link"
                style={{ margin: "0 10px" }}
                color={router.pathname == data.to ? "primary" : "inherit"}
              >
                {data.name}
              </Button>
            </Link>
          ))}
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Daftar
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
