import {WidgetProps} from "@rjsf/utils";
import {JSONSchema7} from "json-schema";
import {SchemaFormContext} from "../../SchemaForm";

export type EnumOption = {
    label: string;
    description?: string;
    disabled?: boolean;
    value: any;
}

function getOptionSchemas(schema: JSONSchema7): JSONSchema7[] {
    const { items } = schema;
    if (items instanceof Array) return items as JSONSchema7[];
    if (typeof items === 'object') {
        if (items.anyOf instanceof Array) return items.anyOf as JSONSchema7[];
        if (items.oneOf instanceof Array) return items.oneOf as JSONSchema7[];
        if (items.allOf instanceof Array) return items.allOf as JSONSchema7[];
    }
    if (schema.anyOf instanceof Array) return schema.anyOf as JSONSchema7[];
    if (schema.oneOf instanceof Array) return schema.oneOf as JSONSchema7[];
    if (schema.allOf instanceof Array) return schema.allOf as JSONSchema7[];
    return [];
}

function getNotAllowedValues(schema: JSONSchema7): string[] {
    const { items, not } = schema;
    const { not: itemsSchemaNot } = items as JSONSchema7 || {};
    const { enum: itemsSchemaEnum } = itemsSchemaNot as JSONSchema7 || {};
    const { enum: schemaEnum } = not as JSONSchema7 || {};
    if (itemsSchemaEnum instanceof Array) return itemsSchemaEnum as [];
    if (schemaEnum instanceof Array) return schemaEnum as [];
    return [];
}

export function mapEnumOptions({ options, schema }: WidgetProps<any, SchemaFormContext>): EnumOption[] {
    const { enumOptions = [] } = options || {};
    const optionSchemas = getOptionSchemas(schema);
    const notAllowedValues = getNotAllowedValues(schema);

    const toEnumOption = ({ value, label }: EnumOption, index: number) => {
      const schema = optionSchemas?.[index];
      const { readOnly, description } = schema || {};
      return ({
        value,
        label,
        description,
        disabled: notAllowedValues?.includes?.(value) || Boolean(readOnly),
        schema
      })
    }

    if (enumOptions?.length > 0) {
        return enumOptions.map(toEnumOption);
    }

    return [];
}
