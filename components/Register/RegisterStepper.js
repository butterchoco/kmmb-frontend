import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import "./RegisterStepper.scss";

function getSteps() {
	return ["Buat Akun", "Data Pribadi", "Data Mahasiswa"];
}

const RegisterStepper = ({ activeStep }) => {
	const steps = getSteps();

	return (
		<Stepper activeStep={activeStep} alternativeLabel>
			{steps.map((label, index) => (
				<Step key={label}>
					<StepLabel className={activeStep == index ? "step--active" : "step"}>
						{label}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default RegisterStepper;
