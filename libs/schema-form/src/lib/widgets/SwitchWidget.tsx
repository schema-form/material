import {WidgetProps} from '@rjsf/utils';
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {mapCheckboxProps} from "../utils/propsMaps/mapCheckboxProps";
import SwitchListItem, {SwitchListItemProps} from "../components/SwitchListItem";

export function mapSwitchListItemProps(props: WidgetProps<any, any, SchemaFormContext>): SwitchListItemProps {
    const commonProps = mapControlProps(props);
    const checkboxProps = mapCheckboxProps(props);
    return {
        ...commonProps,
        ...checkboxProps
    }
}

export default function CheckboxWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const switchListItemProps = mapSwitchListItemProps(props);

    return (
        <SwitchListItem
            data-testid="CheckboxWidget"
            {...switchListItemProps}
        />
    );
}
