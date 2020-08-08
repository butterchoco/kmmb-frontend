import RegisterStepper from "./RegisterStepper";
import { useState } from "react";
import RegisterAccount from "./RegisterAccount";
import RegisterPrivacy from "./RegisterPrivacy";
import RegisterEducation from "./RegisterEducation";
import Alert from "../Alert";

const getRegisterComponent = (
	activeStep,
	nextStep,
	props,
	setSuccessAlertMessage,
	setErrorAlertMessage
) => {
	switch (activeStep) {
		case 0:
			return (
				<RegisterAccount
					nextStep={nextStep}
					setRegisterShow={props.setRegisterShow}
					setIsRegisterComponent={props.setIsRegisterComponent}
					setDisabledClose={props.setDisabledClose}
					setSuccessAlertMessage={setSuccessAlertMessage}
					setErrorAlertMessage={setErrorAlertMessage}
				/>
			);
		case 1:
			return (
				<RegisterPrivacy
					nextStep={nextStep}
					setSuccessAlertMessage={setSuccessAlertMessage}
					setErrorAlertMessage={setErrorAlertMessage}
					{...props}
				/>
			);
		case 2:
			return (
				<RegisterEducation
					setRegisterShow={props.setRegisterShow}
					setSuccessAlertMessage={setSuccessAlertMessage}
					setErrorAlertMessage={setErrorAlertMessage}
					{...props}
				/>
			);
		default:
			return <div>Loading...</div>;
	}
};

const Register = (props) => {
	const [activeStep, setActiveStep] = useState(2);
	const [successAlertMessage, setSuccessAlertMessage] = useState("");
	const [errorAlertMessage, setErrorAlertMessage] = useState("");

	const nextStep = () => {
		setActiveStep((step) => step + 1);
  };
  
	return (
		<div>
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
			<RegisterStepper activeStep={activeStep} />
			{getRegisterComponent(
				activeStep,
				nextStep,
				props,
				setSuccessAlertMessage,
				setErrorAlertMessage
			)}
		</div>
	);
};

export default Register;
