import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {CheckboxListItem, CheckboxListItemProps} from "../components/CheckboxListItem";
import {mapCheckboxProps} from "../utils/propsMaps/mapCheckboxProps";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";

export function mapCheckboxListItemProps(props: WidgetProps<any, any, SchemaFormContext>): CheckboxListItemProps {
    const commonProps = mapControlProps(props);
    const checkboxProps = mapCheckboxProps(props);
    return {
        ...commonProps,
        ...checkboxProps
    }
}

export default function CheckboxWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const checkboxListItemProps = mapCheckboxListItemProps(props);

    return (
        <CheckboxListItem
            data-testid="CheckboxWidget"
            {...checkboxListItemProps}
        />
    );
}
