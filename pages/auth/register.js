import RegisterBase from "../../components/Register/RegisterBase";
import "../../styles/FullscreenModal.scss";
import Link from "next/link";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#FF7614",
		},
		secondary: {
			main: "#841361",
		},
	},
});

const Register = () => {
	return (
		<ThemeProvider theme={theme}>
			<div className="fullscreenModal">
				<Link href="/" replace>
					<button className="basic fullscreenModal__close">
						<span className="material-icons">close</span>
					</button>
				</Link>
				<h2 className="fullscreenModal__title">Daftar KMMB 2020</h2>
				<div className="fullscreenModal__content">
					<RegisterBase />
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Register;
