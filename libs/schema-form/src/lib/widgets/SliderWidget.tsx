import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SliderProps} from "@mui/material/Slider";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {CustomSlider} from "../components/CustomSlider";
import {mapOptions} from "../utils/mapOptions";
import {Option} from "../types/Option";

function mapSliderMarks(props: WidgetProps<any, any, SchemaFormContext>): SliderProps['marks'] {
  const options = mapOptions(props?.options?.enumOptions);

  const toMark = ({ value, label }: Option) => {
    return ({
      value: Number(value),
      label: label,
    })
  }

  if (options?.length > 0) {
    return options.map(toMark);
  }

  return [];
}

export function mapSliderProps(props: WidgetProps<any, any, SchemaFormContext>): SliderProps {
  const { value, onChange } = props;
  const { value: _, onChange: __, ...commonProps } = mapControlProps(props);
  const marks = mapSliderMarks(props);

  const handleChange: SliderProps['onChangeCommitted'] = (event, newValue) => onChange(newValue);

  return {
    ...commonProps,
    color: 'primary',
    marks,
    defaultValue: value,
    onChangeCommitted: handleChange,
  }
}

export default function SliderWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const sliderProps = mapSliderProps(props);

    return (
        <CustomSlider {...sliderProps} />
    )
}
