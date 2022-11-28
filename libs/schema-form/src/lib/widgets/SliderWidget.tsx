import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import Slider, {SliderProps} from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapSelectOptions} from "../utils/maps/mapSelectOptions";
import {FormControl, FormHelperText} from "@mui/material";
import {mapFormControlProps} from "../utils/maps/mapFormControlProps";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapSliderProps(props: WidgetProps<any, any, SchemaFormContext>): SliderProps {
    const { value, onChange } = props;
    const { value: _, onChange: __, ...commonProps } = mapControlProps(props);
    const marks = mapSelectOptions(props);

    const handleChange: SliderProps['onChangeCommitted'] = (event, newValue) => {
        onChange(newValue);
    };

    return {
        ...commonProps,
        color: 'primary',
        marks,
        defaultValue: value,
        onChangeCommitted: handleChange,
    }
}

export default function SliderWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const { label } = props;
    const sliderProps = mapSliderProps(props);
    const formControlProps = mapFormControlProps(props);
    const formHelperText = mapFormHelperTextProps(props);

    const formLabel = label ? (
        <Typography
            children={label}
            gutterBottom
        />
    ) : null;

    const helper = formHelperText?.children ? (
        <FormHelperText {...formHelperText} />
    ) : null;

    return (
        <FormControl {...formControlProps} data-testid="SliderWidget">
            {formLabel}
            <Slider {...sliderProps} />
            {helper}
        </FormControl>
    )
}
