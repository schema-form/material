import {JSONOption, Option} from "../types/Option";

const createValueLabel = (value: any, jsonValue?: string) => typeof value === 'string'
  ? value
  : jsonValue ?? JSON.stringify(value)

export function toJSONOptions(options?: Option[]): JSONOption[] {
  return options?.map(option => {
    const jsonValue = JSON.stringify(option.value);
    return {
      ...option,
      label: option.label ?? createValueLabel(option.value, jsonValue),
      value: jsonValue
    }
  }) || [];
}
