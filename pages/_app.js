import "../styles/global.scss";
import { useState, useEffect } from "react";
import { auth } from "../components/firebase/config";

const KMMBApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((userLog) => {
      if (userLog) {
        setUser(userLog);
        setUserLoggedIn(true);
      } else {
        setUser({});
        setUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <Component
      user={user}
      setUser={setUser}
      userLoggedIn={userLoggedIn}
      setUserLoggedIn={setUserLoggedIn}
      {...pageProps}
    ></Component>
  );
};

export default KMMBApp;
