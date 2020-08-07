import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const Progress = ({ value, color }) => {
	const BorderLinearProgress = withStyles((theme) => ({
		root: {
			height: 10,
			width: "100%",
			borderRadius: 5,
		},
		colorPrimary: {
			backgroundColor:
				theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
		},
		bar: {
			borderRadius: 5,
			backgroundColor: `${color}`,
		},
	}))(LinearProgress);

	return <BorderLinearProgress variant="determinate" value={value} />;
};

export default Progress;
