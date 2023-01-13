import {EnumOptionsType} from "@rjsf/utils";
import {Option} from "../types/Option";

const createValueLabel = (value: any) => typeof value === 'string'
  ? value
  : JSON.stringify(value);

const mapEnumOptionToOption = (option: EnumOptionsType): Option => {
    const { schema } = option;
    return {
        value: option?.value,
        label: schema?.title ?? createValueLabel(option?.value),
        helperText: schema?.description,
        disabled: Boolean(schema?.readOnly),
    }
}

export function mapOptions(options?: EnumOptionsType[]): Option[] {
    return options?.map(mapEnumOptionToOption) || [];
}
