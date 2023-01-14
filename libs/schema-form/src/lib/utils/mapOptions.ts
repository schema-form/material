import {EnumOptionsType, WidgetProps, optionsList} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {Option} from "../types/Option";

const createValueLabel = (value: any) => typeof value === 'string'
  ? value
  : JSON.stringify(value);

const mapEnumOptionToOption = (option: EnumOptionsType): Option => {
    const { schema } = option;
    return {
        value: option?.value,
        label: option?.label ?? schema?.title ?? createValueLabel(option?.value),
        helperText: schema?.description,
        disabled: Boolean(schema?.readOnly),
    }
}

export function mapOptions(props: WidgetProps<any, any, SchemaFormContext>): Option[] {
    const options = props?.options?.enumOptions || optionsList(props.schema?.items);
    return options?.map(mapEnumOptionToOption) || [];
}
