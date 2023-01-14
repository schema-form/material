import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {CheckboxFormGroup, CheckboxFormGroupProps} from "../components/CheckboxFormGroup";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {mapOptions} from "../utils/mapOptions";

export function mapCheckboxFormGroupProps(props: WidgetProps<any, any, SchemaFormContext>): CheckboxFormGroupProps {
    const controlProps = mapControlProps(props);
    const options = mapOptions(props);

    return {
        label: controlProps.label,
        helperText: controlProps.helperText,
        error: controlProps.error,
        disabled: controlProps.disabled,
        value: controlProps.value,
        options: options,
        onChange: (event, value) => props?.onChange?.(value),
    }
}

export default function CheckboxGroupWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const checkboxGroupProps = mapCheckboxFormGroupProps(props);

    return (
        <CheckboxFormGroup
            data-testid="CheckboxGroupWidget"
            {...checkboxGroupProps}
        />
    );
}
