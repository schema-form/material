import React, {useMemo} from 'react';
import {v4 as uuid} from 'uuid';
import isEqual from 'lodash/isEqual';
import {WidgetProps} from '@rjsf/utils';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectProps} from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check"
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import {mapFormControlProps} from "../utils/maps/mapFormControlProps";
import {mapInputLabelProps} from "../utils/maps/mapInputLabelProps";
import {SchemaFormContext} from "../SchemaForm";
import {mapJSONOptions} from "../utils/maps/mapJSONOptions";
import {Option} from "../types/Option";

export function mapSelectProps(props: WidgetProps<any, any, SchemaFormContext>): SelectProps {
    const { label, ...commonProps } = mapControlProps(props);
    const { multiple, formContext } = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const jsonOptions = mapJSONOptions(props);
    const jsonValue = commonProps.value instanceof Array
        ? commonProps.value.map((itemValue: any) => JSON.stringify(itemValue))
        : JSON.stringify(commonProps.value);

    const renderOption = ({ value, label, helperText, disabled }: Option) => {
        const checked = jsonValue instanceof Array
            ? jsonValue?.includes(value)
            : isEqual(jsonValue, value);

        const checkedIcon = checked && (
            <CheckIcon />
        );

        const listItemIcon = multiple && (
            <ListItemIcon>
                {checkedIcon}
            </ListItemIcon>
        );

        return (
            <MenuItem
                key={value}
                dense={dense}
                value={value}
                disabled={disabled}
            >
                {listItemIcon}
                <ListItemText
                    primary={label}
                    secondary={helperText}
                />
            </MenuItem>
        )
    }

    const getOptionLabelByValue = (itemValue: any) => {
        const option = jsonOptions.find(option => itemValue === option.value);
        return option?.label ?? itemValue;
    }

    return {
        ...commonProps,
        label: label ? label : undefined,
        children: jsonOptions?.map(renderOption),
        value: jsonValue,
        onChange: (event, child) => {
            if (event.target.value instanceof Array) {
                const newValue = event.target.value.map((value) => JSON.parse(value));
                props.onChange?.(newValue);
            } else {
                const newValue = JSON.parse(event.target.value as string);
                props.onChange?.(newValue);
            }
        },
        renderValue: (value: any) => {
            return value instanceof Array
                ? value.map(getOptionLabelByValue).join(', ')
                : getOptionLabelByValue(value);
        }
    }
}

export default function SelectWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const selectProps = mapSelectProps(props);
    const formControlProps = mapFormControlProps(props);
    const inputLabelProps = mapInputLabelProps(props);
    const formHelperTextProps = mapFormHelperTextProps(props);
    const labelId = useMemo(uuid, []);

    const inputLabel = inputLabelProps?.children
        ? <InputLabel id={labelId} {...inputLabelProps} />
        : null;

    const helperText = formHelperTextProps?.children
        ? <FormHelperText {...formHelperTextProps} />
        : null;

    return (
        <FormControl hiddenLabel={true} {...formControlProps} data-testid="SelectWidget">
            {inputLabel}
            <Select labelId={labelId} {...selectProps} />
            {helperText}
        </FormControl>
    );
}
