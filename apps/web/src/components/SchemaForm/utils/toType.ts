import {JSONSchema7} from "json-schema";

function toString(value: any): string {
    switch (typeof value) {
        case "undefined": return "";
        case "string": return value;
        default: return JSON.stringify(value);
    }
}

function toObject(value: any): object {
    if (value instanceof Array) {
        const entries = value?.map((item, index) => ({ [index]: item }));
        return Object.assign({}, ...entries);
    }

    switch (typeof value) {
        case "undefined": return {};
        case "object": return value;
        case "string":
            try { return JSON.parse(value); }
            catch (e) { return { 0: value } }
        default: return { 0: value }
    }
}

function toBoolean(value: any): boolean {
    switch (typeof value) {
        case "undefined": return false;
        case "boolean": return value;
        case "string": return !['false', '0'].includes(value);
        default: return Boolean(value);
    }
}

function toArray(value: any): any[] {
    if (value instanceof Array) return value;

    switch (typeof value) {
        case "undefined": return [];
        case "string": return value.split('');
        case "object": return Object.entries(value);
        default: return [value];
    }
}

function toNumber(value: any, isInteger = false): number | undefined {
    const parse = isInteger ? Number.parseInt : Number.parseFloat;
    const omitNonDigitNumbers = (number: number) => [NaN, Infinity].includes(number)
        ? undefined
        : number;

    switch (typeof value) {
        case "undefined": return;
        case "string": {
            const string = value.replace(/\s\S/g, '');
            const number = parse(string);
            return omitNonDigitNumbers(number);
        }
        default: {
            const number = parse(value);
            return omitNonDigitNumbers(number);
        }
    }
}

export function toType(value: any, type: JSONSchema7['type']) {
    const outputType = type instanceof Array ? type?.[0] : type;
    switch(outputType) {
        case "null": return null;
        case "array": return toArray(value);
        case "boolean": return toBoolean(value);
        case "integer": return toNumber(value, true);
        case "number": return toNumber(value);
        case "object": return toObject(value)
        case "string": return toString(value);
        default: return value;
    }
}
