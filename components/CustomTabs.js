import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

const CustomTabs = ({ value, onChange, options }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs
          value={value}
          onChange={onChange}
          aria-label="styled tabs example"
        >
          {options.map((data, index) => (
            <StyledTab key={index} label={data.text} disabled={data.disabled} />
          ))}
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
    </div>
  );
};

export default CustomTabs;
