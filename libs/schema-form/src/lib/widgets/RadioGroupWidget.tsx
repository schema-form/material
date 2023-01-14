import {WidgetProps} from '@rjsf/utils';
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import RadioFormGroup, {RadioFormGroupProps} from "../components/RadioFormGroup";
import {mapOptions} from "../utils/mapOptions";

export function mapRadioFormGroupProps(props: WidgetProps<any, any, SchemaFormContext>): RadioFormGroupProps {
    const commonProps = mapControlProps(props);
    const options = mapOptions(props);
    return {
        ...commonProps,
        options,
        onChange: (event, value) => props.onChange?.(value)
    }
}

export default function RadioGroupWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const radioFormGroupProps = mapRadioFormGroupProps(props);
    return (
        <RadioFormGroup
            data-testid="RadioGroupWidget"
            {...radioFormGroupProps}
        />
    );
}
