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

export function SliderField({ SliderProps, onChange, value: originValue, ...TextFieldProps }: SliderFieldProps) {
  const [value, setValue] = useState<number>(originValue);

  return (
    <Root>
      <Slider
        {...SliderProps}
        size="small"
        sx={{
          position: 'absolute',
          top: TextFieldProps.size === 'small' ? 25 : 42,
          left: 0,
          right: 0,
          zIndex: 1,
          margin: '0 auto'
        }}
        value={value}
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
          inputMode: 'numeric',
          sx: {
            ...TextFieldProps?.InputProps?.sx,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: 0,
          }
        }}
        value={value}
        onChange={(event) => {
          const { value } = event.target || {};
          setValue(value);
          onChange?.(event, value);
        }}
      />
    </Root>
  )
}

export default SliderField;
