import RegisterStepper from "./RegisterStepper";
import { useState } from "react";
import RegisterAccount from "./RegisterAccount";
import RegisterPrivacy from "./RegisterPrivacy";
import RegisterEducation from "./RegisterEducation";

const getRegisterComponent = (data, nextStep) => {
	switch (data) {
		case 0:
			return <RegisterAccount nextStep={nextStep}/>;
		case 1:
			return <RegisterPrivacy nextStep={nextStep} />;
		case 2:
			return <RegisterEducation />;
		default:
			return <div>Loading...</div>;
	}
};

const Register = () => {
	const [activeStep, setActiveStep] = useState(0);

	const nextStep = () => {
		setActiveStep((step) => step + 1);
	};

	return (
		<div>
			<RegisterStepper activeStep={activeStep} />
			{getRegisterComponent(activeStep, nextStep)}
		</div>
	);
};

export default Register;
