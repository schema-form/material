import React, {ChangeEvent, useMemo, useState} from "react";
import {TextFieldProps, SliderProps, TextField, Slider, styled} from "@mui/material";

export type SliderFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  SliderProps?: Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'>;
  value?: number;
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
  const [value, setValue] = useState<number | undefined>(originValue);
  const marksWithoutLabels = useMemo(() => {
    const marks = SliderProps?.marks instanceof Array ? SliderProps?.marks : [];
    return marks?.map(item => ({ value: item.value }))
  }, [SliderProps?.marks]);

  return (
    <Root>
      <StyledSlider
        {...SliderProps}
        textFieldSize={TextFieldProps.size}
        size="small"
        value={value || SliderProps?.min}
        onChange={(event, value) => setValue(value as number)}
        onChangeCommitted={(event, value) => {
          onChange?.(event as Event, value as number);
        }}
        valueLabelDisplay="auto"
        marks={marksWithoutLabels}
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
          const newValue = Number(value);
          onChange?.(event, newValue);
          setValue(newValue);
        }}
      />
    </Root>
  )
}

export default SliderField;
