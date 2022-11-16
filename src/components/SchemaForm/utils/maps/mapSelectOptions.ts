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

export function mapSelectOptions({ options, schema }: WidgetProps<any, SchemaFormContext>): EnumOption[] {
    const { enumOptions = [] } = options || {};
    const optionSchemas = getOptionSchemas(schema);

    const toEnumOption = ({ value, label }: EnumOption, index: number) => {
      const schema = optionSchemas?.[index];
      const { readOnly, title, description } = schema || {};
      const jsonValue = JSON.stringify(value);
      return ({
        value: jsonValue,
        label: title || (typeof value === 'string' ? value : jsonValue),
        description,
        disabled: readOnly,
        schema
      })
    }

    if (enumOptions?.length > 0) {
        return enumOptions.map(toEnumOption);
    }

    return [];
}
