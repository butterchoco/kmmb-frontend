import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useState, useEffect } from "react";
import { Paper, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const Radiobar = ({
  label,
  value,
  options,
  onClick,
  onChange,
  error,
  description,
  tooltip,
  className,
  name,
  disabled,
}) => {
  const [tooltipShow, setTooltipShow] = useState(false);

  return (
    <FormControl
      className={
        className !== undefined ? className + " formField" : "formField"
      }
    >
      {tooltipShow ? (
        <Paper className="formField__tooltip">
          {tooltip.split("\\n").map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </Paper>
      ) : null}
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
        {tooltip !== undefined && tooltip !== "" ? (
          <span
            className="material-icons"
            onMouseEnter={() => setTooltipShow(true)}
            onMouseLeave={() => setTooltipShow(false)}
          >
            help
          </span>
        ) : null}
      </InputLabel>
      <RadioGroup
        aria-label={label}
        className="radiobar"
        name="gender1"
        value={value}
        onChange={onChange}
      >
        {options.map((data, index) => (
          <FormControlLabel
            key={index}
            value={data.key}
            className={value == data.key ? "active" : ""}
            disabled={disabled}
            control={<Radio />}
            label={data.text}
          />
        ))}
      </RadioGroup>
      {error !== undefined && error !== "" ? (
        <FormHelperText style={{ color: "#e84a5f" }}>{error}</FormHelperText>
      ) : null}
      {description !== undefined && description !== "" ? (
        <FormHelperText>{description}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default Radiobar;
