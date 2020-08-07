import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState, useEffect } from "react";
import shadows from "@material-ui/core/styles/shadows";

function Notif(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = ({ variant, show, message }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Notif onClose={handleClose} severity={variant}>
				{message}
			</Notif>
		</Snackbar>
	);
};

export default Alert;
