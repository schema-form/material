import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SliderProps} from "@mui/material/Slider";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {EnumOption} from "../types/EnumOption";
import {CustomSlider} from "../components/CustomSlider";
import {mapJSONOptions} from "../utils/mapJSONOptions";

function mapSliderMarks(props: WidgetProps<any, any, SchemaFormContext>): SliderProps['marks'] {
  const { enumOptions = [] } = props?.options || {};
  const jsonOptions = mapJSONOptions(props);

  const toMark = ({ value, label }: EnumOption) => {
    return ({
      value: Number(value),
      label: label,
    })
  }

  if (enumOptions?.length > 0) {
    return jsonOptions.map(toMark);
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
