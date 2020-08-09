import "../Register/RegisterLoginBase.scss";
import { useState } from "react";
import TextField from "../TextField";
import { Button, CircularProgress } from "@material-ui/core";
import firebase, { auth, db } from "../firebase/config";
import Alert from "../Alert";

const LoginBase = ({ setIsRegisterComponent, setRegisterShow }) => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");

  const isLoginValidated = () => {
    let error = true;
    if (email.value == "") {
      setEmail({ ...email, error: "Masukkan email dengan benar !" });
      error = false;
    } else if (!email.value.includes("@")) {
      setEmail({
        ...email,
        error: "Masukkan email dengan format yang benar !",
      });
      error = false;
    }

    if (password.value == "") {
      setPassword({ ...password, error: "Masukkan password dengan benar !" });
      error = false;
    }
    return error;
  };

  const submitLogin = () => {
    setIsLoading(true);
    if (!isLoginValidated()) {
      setIsLoading(false);
      return;
    } else {
      authLogin();
    }
  };

  const authLogin = () => {
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        const user = result.user;
        checkUserDocumentExist(user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
          setErrorAlertMessage("Email belum terdaftar di sistem.");
        } else if (errorCode == "auth/invalid-email") {
          setErrorAlertMessage("Email memiliki format yang salah.");
        } else if (errorCode == "auth/wrong-password") {
          setErrorAlertMessage(
            "Password yang dimasukkan salah. Silahkan coba lagi !"
          );
        } else {
          setErrorAlertMessage(errorMessage);
        }
      });
  };

  const checkUserDocumentExist = (user) => {
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((snap) => {
        if (snap.exists) {
          setIsLoading(false);
          setSuccessAlertMessage("Berhasil masuk, Tunggu sebentar !");
          setRegisterShow(false);
        } else {
          setErrorAlertMessage(
            "Akun belum terdaftar. Silahkan lakukan registrasi terlebih dahulu !"
          );
          setIsLoading(false);
          user.delete();
          auth.signOut();
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorAlertMessage(e.message);
        auth.signOut();
      });
  };

  const googleAuth = () => {
    setIsLoading(true);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        checkUserDocumentExist(user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
          setErrorAlertMessage("Email belum terdaftar di sistem.");
        } else if (errorCode == "auth/invalid-email") {
          setErrorAlertMessage("Email memiliki format yang salah.");
        } else if (errorCode == "auth/wrong-password") {
          setErrorAlertMessage(
            "Password yang dimasukkan salah. Silahkan coba lagi !"
          );
        } else {
          setErrorAlertMessage(errorMessage);
        }
      });
  };

  return (
    <div className="registerLoginBase">
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
      <button
        className="blue registerLoginBase__button registerLoginBase__button__google"
        onClick={googleAuth}
      >
        <svg
          className="google-icon"
          viewBox="0 0 29 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M29.0002 15.3445C29.0002 14.3248 28.9186 13.2996 28.7447 12.2965H14.791V18.0727H22.7816C22.4501 19.9357 21.3846 21.5837 19.8246 22.6309V26.3788H24.5918C27.3912 23.7663 29.0002 19.9081 29.0002 15.3445Z" />
          <path d="M14.7902 30C18.7801 30 22.1448 28.6717 24.5964 26.3788L19.8292 22.6309C18.5028 23.5458 16.7906 24.0639 14.7956 24.0639C10.9362 24.0639 7.66385 21.4238 6.48971 17.8743H1.57031V21.738C4.08165 26.8032 9.19674 30 14.7902 30Z" />
          <path d="M6.4847 17.8743C5.86502 16.0114 5.86502 13.9941 6.4847 12.1312V8.26749H1.57073C-0.527484 12.506 -0.527484 17.4995 1.57073 21.738L6.4847 17.8743Z" />
          <path d="M14.7902 5.93604C16.8993 5.90297 18.9377 6.70767 20.4652 8.1848L24.6888 3.90223C22.0144 1.35584 18.4648 -0.0441201 14.7902 -2.67652e-05C9.19674 -2.67652e-05 4.08165 3.19674 1.57031 8.26747L6.48428 12.1312C7.65297 8.57613 10.9308 5.93604 14.7902 5.93604Z" />
        </svg>
        Masuk akun dengan Google
      </button>
      <TextField
        className="registerLoginBase__input registerLoginBase__input--email"
        label="Email"
        type="email"
        error={email.error}
        value={email.value}
        placeholder="Masukkan email"
        autoComplete="true"
        onChange={(e) =>
          setEmail({ ...email, value: e.target.value, error: "" })
        }
      />
      <TextField
        className="registerLoginBase__input registerLoginBase__input--email"
        label="Password"
        type="password"
        error={password.error}
        value={password.value}
        placeholder="Masukkan password"
        autoComplete="current-password"
        onChange={(e) =>
          setPassword({ ...password, value: e.target.value, error: "" })
        }
      />
      <Button
        onClick={submitLogin}
        color="secondary"
        variant="contained"
        className="registerLoginBase__button registerLoginBase__button__register"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "24px", height: "24px" }} />
        ) : (
          "Lanjut"
        )}
      </Button>
      <p>
        Belum punya akun ?{" "}
        <span
          className="registerLoginBase__nav__login"
          onClick={() => setIsRegisterComponent(true)}
        >
          Daftar
        </span>
      </p>
    </div>
  );
};

export default LoginBase;
