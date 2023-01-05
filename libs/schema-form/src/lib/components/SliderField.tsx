import React, {ChangeEvent, useState} from "react";
import {TextFieldProps, SliderProps, TextField, Slider, styled} from "@mui/material";

export type SliderFieldProps = Omit<TextFieldProps, 'onChange', 'value'> & {
  SliderProps?: Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'>;
  value?: SliderProps['value'];
  onChange?: (event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value?: number) => void;
}

const Root = styled('div')(({ theme }) => ({
  position: 'relative'
}));

const StyledSlider = styled(Slider)<SliderProps & {
  textFieldSize: TextFieldProps['size'],
}>(({ theme, textFieldSize }) => ({
  position: 'absolute',
  top: textFieldSize === 'small'
    ? theme.spacing(3.25)
    : theme.spacing(5.25),
  width: `calc(100% - ${theme.spacing(2)})`,
  height: 1,
  left: theme.spacing(1),
  zIndex: 1,
  margin: '0 auto'
}));

export function SliderField({ SliderProps, onChange, value: originValue, ...TextFieldProps }: SliderFieldProps) {
  const [value, setValue] = useState<number>(originValue);

  return (
    <Root>
      <StyledSlider
        {...SliderProps}
        textFieldSize={TextFieldProps.size}
        size="small"
        value={value || null}
        onChange={(event) => setValue(event.target?.value)}
        onChangeCommitted={onChange}
      />
      <TextField
        {...TextFieldProps}
        InputLabelProps={{
          ...TextFieldProps?.InputLabelProps,
          shrink: true,
        }}
        InputProps={{
          ...TextFieldProps?.InputProps,
          type: 'number',
          inputMode: 'numeric'
        }}
        value={value || ''}
        onChange={(event) => {
          const { value } = event.target || {};
          onChange?.(event, value);
          setValue(value);
        }}
      />
    </Root>
  )
}

export default SliderField;
