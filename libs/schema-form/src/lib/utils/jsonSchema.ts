import {JSONSchema7} from "json-schema";

export function isObject(schema: JSONSchema7) {
    return (
        schema?.type === 'object' ||
        Boolean(schema?.properties) ||
        Boolean(schema?.patternProperties) ||
        Boolean(schema?.additionalProperties)
    )
}

export function isArray(schema: JSONSchema7) {
    return (
        schema?.type === 'array' ||
        Boolean(schema?.items) ||
        Boolean(schema?.additionalItems)
    )
}

export function isGroup(schema: JSONSchema7) {
    return isObject(schema) || isArray(schema);
}
