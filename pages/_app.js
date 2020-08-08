import "../styles/global.scss";
import { useState, useEffect } from "react";
import { db, auth } from "../components/firebase/config";
import Alert from "../components/Alert";
import Head from "next/head";

const KMMBApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");

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

  useEffect(() => {
    if (user.uid !== undefined) fetchUserData(user);
  }, [userLoggedIn]);

  const fetchUserData = (userLog) => {
    db.collection("user")
      .doc(userLog.uid)
      .get()
      .then((snap) => {
        if (snap.exists) {
          const data = snap.data();
          if (
            data.ketua == null ||
            data.ketua.surat_keterangan_mahasiswa === ""
          ) {
            db.collection("user")
              .doc(userLog.uid)
              .delete()
              .then(() => {
                setErrorAlertMessage(
                  "Akun dihapus dari sistem karna biodata belum terisi sepenuhnya. Silahkan melakukan registrasi ulang !"
                );
                userLog.delete();
                auth.signOut();
              })
              .catch((error) => {
                setErrorAlertMessage(error.message);
              });
          } else {
            setUserData(data);
          }
        }
      });
  };

  return (
    <div>
      <Head>
        <title>KMMB 2020</title>
      </Head>
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

      <Component
        user={user}
        setUser={setUser}
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        userData={userData}
        {...pageProps}
      ></Component>
    </div>
  );
};

export default KMMBApp;
