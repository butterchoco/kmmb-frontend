import RegisterStepper from "./RegisterStepper";
import { useState } from "react";
import RegisterAccount from "./RegisterAccount";
import RegisterPrivacy from "./RegisterPrivacy";
import RegisterEducation from "./RegisterEducation";
import "./Register.scss";

const getRegisterComponent = (data) => {
	switch (data) {
		case 0:
			return <RegisterAccount />;
		case 1:
			return <RegisterPrivacy />;
		default:
			return <div>Loading...</div>;
	}
};

const Register = () => {
	const [activeStep, setActiveStep] = useState(1);

	return (
		<div className="register">
			<RegisterStepper activeStep={activeStep} />
			{getRegisterComponent(activeStep)}
		</div>
	);
};

export default Register;
