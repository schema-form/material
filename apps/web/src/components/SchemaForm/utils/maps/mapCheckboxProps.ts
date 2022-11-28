import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../../SchemaForm";
import {CheckboxProps} from "@mui/material";
import {mapControlProps} from "./mapControlProps";

export function mapCheckboxProps(props: WidgetProps<any, any, SchemaFormContext>): CheckboxProps {
    const { value, onChange } = props;
    const controlProps = mapControlProps(props);
    return {
        ...controlProps,
        indeterminate: value === undefined || value === null,
        checked: Boolean(value),
        onChange: ({ target }) => onChange(target?.checked),
    }
}
