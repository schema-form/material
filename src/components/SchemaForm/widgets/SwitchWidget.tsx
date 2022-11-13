import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SwitchProps, Switch, FormControl, FormControlLabel, FormHelperText} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapFormControlProps} from "../utils/maps/mapFormControlProps";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import {mapFormControlLabelProps} from "../utils/maps/mapFormControlLabelProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapSwitchProps(props: WidgetProps<any, SchemaFormContext>): SwitchProps {
    const { value, onChange } = props;
    return {
        ...mapControlProps(props),
        checked: Boolean(value),
        onChange: ({ target }) => onChange(target?.checked)
    }
}

export default function SwitchWidget(props: WidgetProps<any, SchemaFormContext>) {
    const switchProps = mapSwitchProps(props);
    const formControlProps = mapFormControlProps(props);
    const formControlLabelProps = mapFormControlLabelProps(props);
    return (
        <FormControl {...formControlProps} data-testid="SwitchWidget">
            <FormControlLabel
                {...formControlLabelProps}
                control={<Switch {...switchProps} />}
            />
        </FormControl>
    );
}
