import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    transition: "none",

    "& > span": {
      maxWidth: 40,
      width: "100%",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#841361",
    fontWeight: "bold !important",
    opacity: 1,
    fontSize: "1rem",
  },
}))((props) => <Tab {...props} />);

const CustomTabs = ({ value, onChange, options }) => {
  return (
    <StyledTabs
      value={value}
      onChange={onChange}
      aria-label="styled tabs example"
    >
      {options.map((data, index) => (
        <StyledTab key={index} label={data.text} disabled={data.disabled} />
      ))}
    </StyledTabs>
  );
};

export default CustomTabs;
