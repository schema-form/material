import {JSONOption} from "../types/JSONOption";
import {JSONSchema7} from "json-schema";
import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {EnumOption} from "../types/EnumOption";

const mapEnumOptionToJSONOption = ({ value, label }: EnumOption): JSONOption => {
  const jsonValue = JSON.stringify(value);
  return {
    value: jsonValue,
    label: label ?? (typeof value === 'string' ? value : jsonValue),
    disabled: false
  }
}

const mapEnumToJSONOption = (value: any): JSONOption => {
    const jsonValue = JSON.stringify(value);
    return {
        value: jsonValue,
        label: typeof value === 'string' ? value : jsonValue,
        disabled: false
    }
}

const mapSchemaToJSONOption = (schema?: JSONSchema7): JSONOption => {
    const value = schema?.const ?? schema?.enum?.[0];
    const jsonValue = JSON.stringify(value);
    return {
        value: jsonValue,
        label: schema?.title ?? (typeof value === 'string' ? value : jsonValue),
        helperText: schema?.description,
        disabled: Boolean(schema?.readOnly),
    }
}

export function mapJSONOptions(props: WidgetProps<any, any, SchemaFormContext>): JSONOption[] {
    const { schema } = props;
    const schemaItems = schema?.items as JSONSchema7;
    const optionsAsEnumList = schemaItems?.enum || schema?.enum;
    const isAnyOfSelect = props.id?.endsWith('_select');

    if (isAnyOfSelect) {
        return props?.options?.enumOptions?.map(mapEnumOptionToJSONOption) || [];
    }

    if (optionsAsEnumList) {
        return optionsAsEnumList?.map?.(mapEnumToJSONOption);
    }

    const optionsAsSchemaList = (schemaItems?.anyOf || schemaItems?.oneOf || schemaItems?.allOf || schema?.anyOf || schema?.oneOf || schema?.allOf) as JSONSchema7[];

    if (optionsAsSchemaList) {
        return optionsAsSchemaList?.map?.(mapSchemaToJSONOption);
    }

    return [];
}
