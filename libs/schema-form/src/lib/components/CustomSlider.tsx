import Typography, {TypographyProps} from "@mui/material/Typography";
import {FormControl, FormHelperText} from "@mui/material";
import Slider, {SliderProps} from "@mui/material/Slider";
import React, {useId} from "react";
import {FormHelperTextProps} from "@mui/material/FormHelperText";

export type CustomSliderProps = SliderProps & {
  error?: FormHelperTextProps['error'];
  label?: TypographyProps['children'];
  helperText?: FormHelperTextProps['children'];
}
export function CustomSlider({ label, error, helperText, ...SliderProps }: CustomSliderProps) {
  const id = useId();
  const color = error
    ? ('error' as SliderProps['color'])
    : SliderProps.color;

  const controlLabel = label ? (
    <Typography
      component="label"
      htmlFor={id}
      variant="body1"
      children={label}
      gutterBottom
      color={error ? 'error' : 'textPrimary'}
    />
  ) : null;

  const helper = helperText ? (
    <FormHelperText
      disabled={SliderProps.disabled}
      error={error}
      sx={{mt: 1}}
    >
      {helperText}
    </FormHelperText>
  ) : null;

  return (
    <FormControl
      error={error}
      disabled={SliderProps.disabled}
    >
      {controlLabel}
      <Slider
        {...SliderProps}
        id={id}
        color={color}
      />
      {helper}
    </FormControl>
  )
}

export default CustomSlider;
