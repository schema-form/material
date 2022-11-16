import React, {useMemo} from 'react';
import {v4 as uuid} from 'uuid';
import {WidgetProps} from '@rjsf/utils';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemIcon, ListItemText,
    MenuItem,
    Select,
    SelectProps
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import {mapControlProps} from "../utils/maps/mapControlProps";
import {EnumOption, mapEnumOptions} from "../utils/maps/mapEnumOptions";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import {mapFormControlProps} from "../utils/maps/mapFormControlProps";
import {mapInputLabelProps} from "../utils/maps/mapInputLabelProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapSelectOptions(props: WidgetProps<any, SchemaFormContext>) {
    const { value: valueList, multiple, formContext } = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const enumOptions = mapEnumOptions(props);

    const renderOption = ({ value, label, description, disabled }: EnumOption) => {
        const key = JSON.stringify(value);

        const renderCheckIcon = () => {
            if (!multiple) return null;
            const checked = valueList?.includes?.(value);

            return (
                <ListItemIcon style={{
                    minWidth: 24,
                    marginRight: 16
                }}>
                    {checked && <CheckIcon />}
                </ListItemIcon>
            );
        }

        return (
            <MenuItem key={key}
                  dense={dense}
                  value={value}
                  disabled={disabled}
            >
                {renderCheckIcon()}
                <ListItemText
                    primary={label}
                    secondary={description}
                />
            </MenuItem>
        )
    }

    return enumOptions?.map(renderOption);
}

export function mapSelectProps(props: WidgetProps<any, SchemaFormContext>): SelectProps {
    const { options } = props;
    const { enumOptions } = options || {};
    const { label, ...commonProps } = mapControlProps(props);
    const notEmpty = Boolean;

    const getOptionLabel = (value: any) => {
        const hasEqualValue = (option: EnumOption) => option.value === value;
        return (enumOptions instanceof Array)
            ? enumOptions.find(hasEqualValue)?.label
            : value;
    }

    const renderValue = (value: any) => (value instanceof Array)
        ? value.filter(notEmpty).map(getOptionLabel).join(', ')
        : getOptionLabel(value);

    return {
        ...commonProps,
        label: label ? label : undefined,
        children: mapSelectOptions(props),
        renderValue
    }
}

export default function SelectWidget(props: WidgetProps<any, SchemaFormContext>) {
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
