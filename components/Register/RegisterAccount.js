import "./RegisterLoginBase.scss";
import TextField from "../TextField";
import { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import firebase, { auth, db } from "../firebase/config";
import LinearProgress from "../Progress";

const RegisterAccount = ({
  nextStep,
  setIsRegisterComponent,
  setDisabledClose,
  setRegisterShow,
  setSuccessAlertMessage,
  setErrorAlertMessage,
}) => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    strong: 0,
    error: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrongColor = () => {
    const color = { yellow: "#fbd46d", green: "#32b865", red: "#e84a5f" };
    if (password.strong > 60) {
      return color.green;
    } else if (password.strong > 30) {
      return color.yellow;
    }
    return color.red;
  };

  const checkStrongPassword = (e) => {
    const eightCharPassword = new RegExp("^(?=.{8,})");
    const numericCharPassword = new RegExp("^(?=.*[0-9])");
    const uppercaseCharPassword = new RegExp("^(?=.*[A-Z])");
    const lowercaseCharPassword = new RegExp("^(?=.*[a-z])");
    const specialCharPassword = new RegExp("^(?=.*[!@#$%^&*()])");
    const val = e.target.value;
    let multStrong = 0.1;
    if (eightCharPassword.test(val)) multStrong += 0.3;
    if (numericCharPassword.test(val)) multStrong += 1.4;
    if (uppercaseCharPassword.test(val)) multStrong += 1.6;
    if (lowercaseCharPassword.test(val)) multStrong += 0.2;
    if (specialCharPassword.test(val)) multStrong += 0.8;
    const percentageStrong = val.length * multStrong;

    if (percentageStrong < 100) {
      setPassword({
        ...password,
        value: val,
        strong: percentageStrong,
        error: "",
      });
    } else {
      setPassword({
        ...password,
        value: val,
        strong: 100,
        error: "",
      });
    }
  };

  const isRegisterValidated = () => {
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
    } else {
      const strongPasswordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
      );
      if (!strongPasswordRegex.test(password.value)) {
        setPassword({
          ...password,
          error:
            "Masukkan password minimal 8 karakter dan satu huruf besar, huruf kecil dan angka !",
        });
        error = false;
      }
    }

    if (confirmPassword.value == "") {
      setConfirmPassword({
        ...confirmPassword,
        error: "Masukkan konfirmasi ulang password dengan benar !",
      });
      error = false;
    } else if (confirmPassword.value !== password.value) {
      setConfirmPassword({
        ...confirmPassword,
        error: "Masukkan konfirmasi ulang password sesuai dengan password !",
      });
      error = false;
    }
    return error;
  };

  const submitRegistration = () => {
    setIsLoading(true);
    if (!isRegisterValidated()) {
      setIsLoading(false);
      return;
    } else {
      authRegister();
    }
  };

  const authRegister = () => {
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        const user = result.user;
        checkUserDocumentExist(user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          setErrorAlertMessage("Akun sudah terdaftar. Silahkan lakukan login!");
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
          const userData = snap.data();
          if (userData.ketua !== null) {
            setErrorAlertMessage(
              "Akun sudah terdaftar. Silahkan lakukan login!"
            );
            setIsLoading(false);
            auth.signOut();
          } else {
            createUserDocument(user);
          }
        } else {
          createUserDocument(user);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorAlertMessage(e.message);
        auth.signOut();
      });
  };

  const createUserDocument = (user) => {
    db.collection("user")
      .doc(user.uid)
      .set({
        bukti_pembayaran: "",
        proposal: "",
        link_video: "",
        verifikasi_link_proposal: "Belum Mengupload",
        verifikasi_pembayaran: "Belum Membayar",
        ketua: null,
        anggota_1: null,
        anggota_2: null,
      })
      .then(() => {
        setIsLoading(false);
        setDisabledClose(true);
        setSuccessAlertMessage("Berhasil daftar akun silahkan isi data diri !");
        nextStep();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorAlertMessage("Gagal mendaftarkan akun !");
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
      .then(function (result) {
        const user = result.user;
        checkUserDocumentExist(user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        setErrorAlertMessage(errorMessage);
      });
  };

  return (
    <div className="registerLoginBase">
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
        Buat akun dengan Google
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
        autoComplete="new-password"
        error={password.error}
        value={password.value}
        placeholder="Masukkan password"
        description="Password Strength:"
        tooltip="Password harus memiliki:
				\n- Minimal 8 karakter
				\n- Minimal 1 huruf besar
				\n- Minimal 1 huruf kecil
				\n- Minimal 1 angka"
        onChange={(e) => checkStrongPassword(e)}
      />
      <LinearProgress
        color={getPasswordStrongColor()}
        value={password.strong}
      />
      <p></p>
      <TextField
        className="registerLoginBase__input registerLoginBase__input--email"
        label="Konfirmasi Ulang Password"
        type="password"
        error={confirmPassword.error}
        value={confirmPassword.value}
        placeholder="Masukkan konfirmasi ulang password"
        onChange={(e) =>
          setConfirmPassword({
            ...confirmPassword,
            value: e.target.value,
            error: "",
          })
        }
      />
      <Button
        color="secondary"
        variant="contained"
        className="registerLoginBase__button registerLoginBase__button__register"
        onClick={submitRegistration}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "24px", height: "24px" }} />
        ) : (
          "Lanjut"
        )}
      </Button>
      <p>
        Sudah punya akun ?{" "}
        <span
          className="registerLoginBase__nav__login"
          onClick={() => setIsRegisterComponent(false)}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterAccount;
