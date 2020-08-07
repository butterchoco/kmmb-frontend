import RegisterStepper from "./RegisterStepper";
import { useState } from "react";
import RegisterAccount from "./RegisterAccount";
import RegisterPrivacy from "./RegisterPrivacy";
import RegisterEducation from "./RegisterEducation";

const getRegisterComponent = (activeStep, nextStep, setIsRegisterComponent) => {
	switch (activeStep) {
		case 0:
			return <RegisterAccount nextStep={nextStep} setIsRegisterComponent={setIsRegisterComponent}/>;
		case 1:
			return <RegisterPrivacy nextStep={nextStep} />;
		case 2:
			return <RegisterEducation />;
		default:
			return <div>Loading...</div>;
	}
};

const Register = ({ setIsRegisterComponent }) => {
	const [activeStep, setActiveStep] = useState(0);

	const nextStep = () => {
		setActiveStep((step) => step + 1);
	};

	return (
		<div>
			<RegisterStepper activeStep={activeStep} />
			{getRegisterComponent(activeStep, nextStep, setIsRegisterComponent)}
		</div>
	);
};

export default Register;
