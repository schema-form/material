import {Option} from "../types/Option";
import {JSONSchema7} from "json-schema";
import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";

const mapEnumToOption = (value: any): Option => {
    const jsonValue = JSON.stringify(value);
    return {
        value: jsonValue,
        label: typeof value === 'string' ? value : jsonValue,
        disabled: false
    }
}

const mapSchemaToOption = (schema?: JSONSchema7): Option => {
    const value = schema?.const || schema?.enum?.[0];
    const jsonValue = JSON.stringify(value);
    return {
        value: jsonValue,
        label: schema?.title,
        helperText: schema?.description,
        disabled: Boolean(schema?.readOnly),
    }
}

export function mapJSONOptions(props: WidgetProps<any, any, SchemaFormContext>): Option[] {
    const { schema } = props;
    const schemaItems = schema?.items as JSONSchema7;
    const optionsAsEnumList = schemaItems?.enum || schema?.enum;

    if (optionsAsEnumList) {
        return optionsAsEnumList?.map?.(mapEnumToOption);
    }

    const optionsAsSchemaList = (schemaItems?.anyOf || schemaItems?.oneOf || schemaItems?.allOf || schema?.anyOf || schema?.oneOf || schema?.allOf) as JSONSchema7[];

    if (optionsAsSchemaList) {
        return optionsAsSchemaList?.map?.(mapSchemaToOption);
    }

    return [];
}
