import "../styles/global.scss";
import { useState, useEffect } from "react";
import { db, auth } from "../components/firebase/config";
import Alert from "../components/Alert";
import Head from "next/head";
import Loading from "../components/Loading.js";

const KMMBApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((userLog) => {
      if (userLog) {
        setUser(userLog);
        setUserLoggedIn(true);
        setIsloading(false);
      } else {
        setUser({});
        setUserLoggedIn(false);
        setIsloading(false);
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
                setIsloading(false);
              })
              .catch((error) => {
                setErrorAlertMessage(error.message);
                setIsloading(false)
              });
          } else {
            setUserData(data);
            setIsloading(false);
          }
        }
      });
  };

  if (isLoading) return <Loading />;

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
