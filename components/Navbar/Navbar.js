import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Link from "next/link";
import "./Navbar.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { Paper, Badge } from "@material-ui/core";

const Navbar = (props) => {
  const {
    setRegisterShow,
    userData,
    setUser,
    userLoggedIn,
    setUserLoggedIn,
  } = props;
  const router = useRouter();
  const links = [
    { name: "Tentang Kami", to: "#aboutLandingPage" },
    { name: "Acara", to: "#eventLandingPage" },
  ];
  const [mobileNavShow, setMobileNavShow] = useState(false);
  const [profileNavShow, setProfileNavShow] = useState(false);

  useEffect(() => {
    setMobileNavShow(false);
    setProfileNavShow(false);
  }, [userLoggedIn]);

  const logout = () => {
    auth.signOut().then(() => {
      setUserLoggedIn(false);
      setUser({});
    });
  };

  return (
    <div>
      <AppBar elevation={0} color="inherit">
        <Toolbar>
          <Typography>
            <Link href="/" replace>
              <img
                className="navbar__logo"
                style={{ height: "42px" }}
                src="/images/logo_KMMB.png"
                alt="logo_KMMB"
              />
            </Link>
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
            {userLoggedIn && userData.ketua !== undefined ? (
              <button
                onClick={() => setProfileNavShow(!profileNavShow)}
                className="basic primary navbar__profileButton"
              >
                {userData.verifikasi_pembayaran == "Belum Membayar" ||
                userData.verifikasi_link_proposal == "Belum Mengupload" ? (
                  <Badge badgeContent={1} color="secondary">
                    <span className="material-icons">person</span>
                  </Badge>
                ) : (
                  <span className="material-icons">person</span>
                )}
                {userData.ketua.nama_lengkap}
              </button>
            ) : (
              <button
                className="navbar__daftar primary"
                onClick={() => setRegisterShow(true)}
              >
                Daftar
              </button>
            )}
            {userLoggedIn && profileNavShow ? (
              <Paper className="navbar__profileNav">
                <Link href="/profile" replace>
                  <div className="navbar__profileNav__item">
                    <p>
                      {userData.verifikasi_pembayaran == "Belum Membayar" ||
                      userData.verifikasi_link_proposal ==
                        "Belum Mengupload" ? (
                        <span className="material-icons notification">
                          error
                        </span>
                      ) : null}
                      Pembayaran & Proposal
                    </p>
                  </div>
                </Link>
                <div className="navbar__profileNav__item" onClick={logout}>
                  <p>Keluar</p>
                </div>
              </Paper>
            ) : null}
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
