import {WidgetProps} from '@rjsf/utils';
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {mapOptions} from "../utils/mapOptions";
import {SelectField, SelectFieldProps} from "../components/SelectField";

export function mapSelectFieldProps(props: WidgetProps<any, any, SchemaFormContext>): SelectFieldProps {
    const controlProps = mapControlProps(props);
    const options = mapOptions(props?.options?.enumOptions);

    return {
        ...controlProps,
        options,
        onChange: (event, newValue) => props.onChange?.(newValue)
    }
}

export default function SelectWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const selectFieldProps = mapSelectFieldProps(props);
    return <SelectField {...selectFieldProps} />
}
