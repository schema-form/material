import {WidgetProps} from '@rjsf/utils';
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import RadioListGroup, {RadioListGroupProps} from "../components/RadioListGroup";
import {mapJSONOptions} from "../utils/mapJSONOptions";

export function mapRadioListGroupProps(props: WidgetProps<any, any, SchemaFormContext>): RadioListGroupProps {
    const commonProps = mapControlProps(props);
    const options = mapJSONOptions(props);
    const jsonValue = JSON.stringify(props.value);
    return {
        ...commonProps,
        options,
        value: jsonValue,
        onChange: (event) => {
            const jsonValue = event.target?.value;
            const hasJsonValue = Boolean(jsonValue);
            const newValue = hasJsonValue
                ? JSON.parse(jsonValue)
                : jsonValue;
            props.onChange?.(newValue);
        }
    }
}

export default function RadioGroupWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const radioListGroupProps = mapRadioListGroupProps(props);
    return (
        <RadioListGroup
            data-testid="RadioGroupWidget"
            {...radioListGroupProps}
        />
    );
}
