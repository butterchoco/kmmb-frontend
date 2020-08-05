import Register from "./Register";
import "./RegisterLoginBase.scss";

const RegisterLoginBase = () => {
  return (
    <div className="registerLoginBase">
      <button className="basic registerLoginBase__close">
        <span className="material-icons">close</span>
      </button>
      <Register />
    </div>
  );
};

export default RegisterLoginBase;
