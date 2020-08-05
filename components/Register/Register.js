import RegisterStepper from "./RegisterStepper";
import { useState } from "react";
import RegisterAccount from "./RegisterAccount";
import "./Register.scss";

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="register">
      <RegisterStepper activeStep={activeStep} />
      <RegisterAccount />
    </div>
  );
};

export default Register;
