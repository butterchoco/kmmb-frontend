import RegisterBase from "./Register/RegisterBase";
import LoginBase from "./Login/LoginBase";
import { useState, useEffect } from "react";
import "../styles/FullscreenModal.scss";

const RegisterLoginBase = (props) => {
  const [isRegisterComponent, setIsRegisterComponent] = useState(true);
  const [disabledClose, setDisabledClose] = useState(false);

  useEffect(() => {
    return () => {
      setDisabledClose(false);
      setIsRegisterComponent(true);
    };
  }, []);

  return (
    <div className="fullscreenModal">
      {!disabledClose ? (
        <button
          className="basic fullscreenModal__close"
          onClick={() => props.setRegisterShow(false)}
        >
          <span className="material-icons">close</span>
        </button>
      ) : null}
      {isRegisterComponent ? (
        <h2 className="fullscreenModal__title">Daftar KMMB 2020</h2>
      ) : (
        <h2 className="fullscreenModal__title">Masuk KMMB 2020</h2>
      )}
      <div className="fullscreenModal__content">
        {isRegisterComponent ? (
          <RegisterBase
            setIsRegisterComponent={setIsRegisterComponent}
            setDisabledClose={setDisabledClose}
            setRegisterShow={props.setRegisterShow}
            {...props}
          />
        ) : (
          <LoginBase
            setIsRegisterComponent={setIsRegisterComponent}
            setRegisterShow={props.setRegisterShow}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterLoginBase;
