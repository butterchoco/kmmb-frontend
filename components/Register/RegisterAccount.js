import "./RegisterAccount.scss";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";

const RegisterAccount = () => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    showPassword: false,
    error: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    showPassword: false,
    error: "",
  });

  return (
    <div className="registerAccount">
      <button className="blue registerAccount__button registerAccount__button__google">
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
        className="registerAccount__input registerAccount__input--email"
        label="Email"
        type="email"
        value={email.value}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
      />
      <FormControl className="registerAccount__input registerAccount__input--password">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={password.showPassword ? "text" : "password"}
          value={password.value}
          onChange={(e) => setPassword({ ...password, value: e.target.value })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setPassword({
                    ...password,
                    showPassword: !password.showPassword,
                  })
                }
              >
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className="registerAccount__input registerAccount__input--password">
        <InputLabel htmlFor="standard-adornment-password">
          Konfirmasi Ulang Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={confirmPassword.showPassword ? "text" : "password"}
          value={confirmPassword.value}
          onChange={(e) =>
            setConfirmPassword({ ...confirmPassword, value: e.target.value })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setConfirmPassword({
                    ...confirmPassword,
                    showPassword: !confirmPassword.showPassword,
                  })
                }
              >
                {confirmPassword.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <button className="primary registerAccount__button registerAccount__button__register">
        Lanjut
      </button>
      <p>
        Sudah punya akun ?{" "}
        <span className="registerAccount__nav__login">Login</span>
      </p>
    </div>
  );
};

export default RegisterAccount;
