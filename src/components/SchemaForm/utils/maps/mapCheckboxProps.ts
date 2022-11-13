import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../../SchemaForm";
import {CheckboxProps} from "@mui/material";
import {mapControlProps} from "./mapControlProps";

export function mapCheckboxProps(props: WidgetProps<any, SchemaFormContext>): CheckboxProps {
    const { value, onChange } = props;
    return {
        ...mapControlProps(props),
        indeterminate: value === undefined || value === null,
        checked: Boolean(value),
        onChange: ({ target }) => onChange(target?.checked),
    }
}
