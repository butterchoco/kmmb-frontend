import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"& > input": {
			paddingRight: theme.spacing(5),
		},
		"&.error input": {
			border: "2px solid #e84a5f",
		},
	},
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.common.white,
		border: "1px solid #ced4da",
		fontSize: 16,
		width: "100%",
		padding: "10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
}))(InputBase);

const TextField = ({
	label,
	defaultValue,
	value,
	onChange,
	error,
	description,
	tooltip,
	type,
	className,
	name,
	disabled,
	placeholder,
	autoComplete,
	autoFocus
}) => {
	const [typePassword, setTypePassword] = useState(false);
	const [tooltipShow, setTooltipShow] = useState(false);
	const [cursorX, setCursorX] = useState(0);

	return (
		<FormControl className={className !== undefined ? className + " formField": "formField"}>
			{tooltipShow ? (
				<Paper className="formField__tooltip" style={{ transform: `translate(${cursorX}px)` }}>
					{tooltip.split("\\n").map((item, i) => (
						<p key={i}>{item}</p>
					))}
				</Paper>
			) : null}
			<InputLabel shrink>
				{label}
				{tooltip !== undefined && tooltip !== "" ? (
					<span
						className="material-icons"
						onMouseMove={(e) => setCursorX(window.outerWidth)}
						onMouseEnter={() => setTooltipShow(true)}
						onMouseLeave={() => setTooltipShow(false)}
					>
						help
					</span>
				) : null}
			</InputLabel>
			{type !== "password" ? (
				<BootstrapInput
					name={name}
					defaultValue={defaultValue}
					className={error !== undefined && error !== "" ? "error" : ""}
					type={type}
					value={value}
					onChange={onChange}
					disabled={disabled}
					aria-describedby="component-text"
					placeholder={placeholder}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
				/>
			) : (
				<BootstrapInput
					defaultValue={defaultValue}
					name={name}
					placeholder={placeholder}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					disabled={disabled}
					className={error !== undefined && error !== "" ? "error" : ""}
					type={typePassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					endAdornment={
						type == "password" ? (
							<InputAdornment
								position="end"
								style={{ position: "absolute", right: 0 }}
							>
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setTypePassword(!typePassword);
									}}
								>
									{typePassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						) : (
							false
						)
					}
				/>
			)}
			{error !== undefined && error !== "" ? (
				<FormHelperText style={{ color: "#e84a5f" }}>{error}</FormHelperText>
			) : null}
			{description !== undefined && description !== "" ? (
				<FormHelperText>{description}</FormHelperText>
			) : null}
		</FormControl>
	);
};

export default TextField;
