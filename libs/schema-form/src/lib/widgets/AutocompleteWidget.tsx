import React from 'react';
import {WidgetProps} from "@rjsf/utils";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {mapOptions} from "../utils/mapOptions";
import AutocompleteField, {AutocompleteFieldProps} from "../components/AutocompleteField";

export function mapAutocompleteFieldProps(props: WidgetProps<any, any, SchemaFormContext>): AutocompleteFieldProps {
  const controlProps = mapControlProps(props);
  const options = mapOptions(props);

  return {
    ...controlProps,
    options,
    onChange: (event, newValue) => props.onChange?.(newValue)
  }
}

export default function AutocompleteWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const autocompleteFieldProps = mapAutocompleteFieldProps(props);
    return <AutocompleteField {...autocompleteFieldProps} data-testid="AutocompleteWidget" />;
}
