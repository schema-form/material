import {ListItemTextProps} from "@mui/material";

export type AppRoutes = {
    [key: string]: AppRouteProps
}

export type AppRouteProps = {
    title: ListItemTextProps['primary'];
    description?: ListItemTextProps['secondary'];
    fetchSchema?: () => Promise<any>;
    children?: AppRoutes;
}

export const appRoutes: AppRoutes = {
    '/keywords': {
        title: 'Keywords',
        children: {
            '/$ref': {
                title: '$ref',
                children: {
                    '/properties': {
                        title: 'properties',
                        fetchSchema: async () => import('../schemas/keywords/$ref/$ref[properties].schema.json'),
                    },
                    '/definitions': {
                        title: 'definitions',
                        fetchSchema: async () => import('../schemas/keywords/$ref/$ref[definitions].schema.json'),
                    },
                }
            },
            '/additionalItems': {
                title: 'additionalItems',
                children: {
                    '/true': {
                        title: 'true',
                        fetchSchema: async () => import('../schemas/keywords/additionalItems/additionalItems[true].schema.json'),
                    },
                    '/false': {
                        title: 'false',
                        fetchSchema: async () => import('../schemas/keywords/additionalItems/additionalItems[false].schema.json'),
                    },
                    '/schema': {
                        title: 'schema',
                        fetchSchema: async () => import('../schemas/keywords/additionalItems/additionalItems[schema].schema.json'),
                    },
                }
            },
            '/additionalProperties': {
                title: 'additionalProperties',
                children: {
                    '/true': {
                        title: 'true',
                        fetchSchema: async () => import('../schemas/keywords/additionalProperties/additionalProperties[true].schema.json'),
                    },
                    '/false': {
                        title: 'false',
                        fetchSchema: async () => import('../schemas/keywords/additionalProperties/additionalProperties[false].schema.json'),
                    },
                    '/schema': {
                        title: 'schema',
                        fetchSchema: async () => import('../schemas/keywords/additionalProperties/additionalProperties[schema].schema.json'),
                    },
                }
            },
            '/allOf': {
                title: 'allOf',
                children: {
                    '/properties': {
                        title: 'properties',
                        fetchSchema: async () => import('../schemas/keywords/allOf/allOf[properties].schema.json'),
                    },
                    '/rules': {
                        title: 'rules',
                        fetchSchema: async () => import('../schemas/keywords/allOf/allOf[rules].schema.json'),
                    },
                }
            },
            '/anyOf': {
                title: 'anyOf',
                children: {
                    '/options': {
                        title: 'options',
                        fetchSchema: async () => import('../schemas/keywords/anyOf/anyOf[options].schema.json'),
                    },
                    '/rules': {
                        title: 'rules',
                        fetchSchema: async () => import('../schemas/keywords/anyOf/anyOf[rules].schema.json'),
                    },
                }
            },
            '/contentEncoding': {
                title: 'contentEncoding',
                children: {
                    '/main': {
                        title: 'main',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding.schema.json'),
                    },
                    '/base64': {
                        title: 'base64',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding[base64].schema.json'),
                    },
                    '/7bit': {
                        title: '7bit',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding[7bit].schema.json'),
                    },
                    '/8bit': {
                        title: '8bit',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding[8bit].schema.json'),
                    },
                    '/binary': {
                        title: 'binary',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding[binary].schema.json'),
                    },
                    '/quoted-printable': {
                        title: 'quoted-printable',
                        fetchSchema: async () => import('../schemas/keywords/contentEncoding/contentEncoding[quoted-printable].schema.json'),
                    },
                }
            },
            '/contentMediaType': {
                title: 'contentMediaType',
                children: {
                    '/jpeg': {
                        title: 'jpeg',
                        fetchSchema: async () => import('../schemas/keywords/contentMediaType/contentMediaType[jpeg].schema.json'),
                    },
                    '/json': {
                        title: 'json',
                        fetchSchema: async () => import('../schemas/keywords/contentMediaType/contentMediaType[json].schema.json'),
                    },
                    '/pdf': {
                        title: 'pdf',
                        fetchSchema: async () => import('../schemas/keywords/contentMediaType/contentMediaType[pdf].schema.json'),
                    },
                    '/xml': {
                        title: 'xml',
                        fetchSchema: async () => import('../schemas/keywords/contentMediaType/contentMediaType[xml].schema.json'),
                    },
                    '/yaml': {
                        title: 'yaml',
                        fetchSchema: async () => import('../schemas/keywords/contentMediaType/contentMediaType[yaml].schema.json'),
                    },
                }
            },
            '/default': {
                title: 'default',
                children: {
                    '/checkbox': {
                        title: 'checkbox',
                        fetchSchema: async () => import('../schemas/keywords/default/default[checkbox].schema.json'),
                    },
                    '/select': {
                        title: 'select',
                        fetchSchema: async () => import('../schemas/keywords/default/default[select].schema.json'),
                    },
                    '/input': {
                        title: 'input',
                        fetchSchema: async () => import('../schemas/keywords/default/default[input].schema.json'),
                    },
                }
            },
            '/definitions': {
                title: 'definitions',
                children: {
                    '/properties': {
                        title: 'properties',
                        fetchSchema: async () => import('../schemas/keywords/definitions/definitions[properties].schema.json'),
                    },
                    '/property': {
                        title: 'property',
                        fetchSchema: async () => import('../schemas/keywords/definitions/definitions[property].schema.json'),
                    },
                }
            },
            '/dependencies': {
                title: 'dependencies',
                children: {
                    '/propertyNames': {
                        title: 'propertyNames',
                        fetchSchema: async () => import('../schemas/keywords/dependencies/dependencies[propertyNames].schema.json'),
                    },
                    '/schema': {
                        title: 'schema',
                        fetchSchema: async () => import('../schemas/keywords/dependencies/dependencies[schema].schema.json'),
                    },
                }
            },
            '/format': {
                title: 'format',
                children: {
                    '/color': {
                        title: 'color',
                        fetchSchema: async () => import('../schemas/keywords/format/format[color].schema.json'),
                    },
                    '/date': {
                        title: 'date',
                        fetchSchema: async () => import('../schemas/keywords/format/format[date].schema.json'),
                    },
                    '/email': {
                        title: 'email',
                        fetchSchema: async () => import('../schemas/keywords/format/format[email].schema.json'),
                    },
                    '/hostname': {
                        title: 'hostname',
                        fetchSchema: async () => import('../schemas/keywords/format/format[hostname].schema.json'),
                    },
                    '/ipv4': {
                        title: 'ipv4',
                        fetchSchema: async () => import('../schemas/keywords/format/format[ipv4].schema.json'),
                    },
                    '/data-url': {
                        title: 'data-url',
                        fetchSchema: async () => import('../schemas/keywords/format/format[data-url].schema.json'),
                    },
                    '/date-time': {
                        title: 'date-time',
                        fetchSchema: async () => import('../schemas/keywords/format/format[date-time].schema.json'),
                    },
                    '/ipv6': {
                        title: 'ipv6',
                        fetchSchema: async () => import('../schemas/keywords/format/format[ipv6].schema.json'),
                    },
                    '/json-pointer': {
                        title: 'json-pointer',
                        fetchSchema: async () => import('../schemas/keywords/format/format[json-pointer].schema.json'),
                    },
                    '/password': {
                        title: 'password',
                        fetchSchema: async () => import('../schemas/keywords/format/format[password].schema.json'),
                    },
                    '/regex': {
                        title: 'regex',
                        fetchSchema: async () => import('../schemas/keywords/format/format[regex].schema.json'),
                    },
                    '/uri': {
                        title: 'uri',
                        fetchSchema: async () => import('../schemas/keywords/format/format[uri].schema.json'),
                    },
                    '/uuid': {
                        title: 'uuid',
                        fetchSchema: async () => import('../schemas/keywords/format/format[uuid].schema.json'),
                    },
                }
            },
            '/items': {
                title: 'items',
                children: {
                    '/unique': {
                        title: 'unique',
                        fetchSchema: async () => import('../schemas/keywords/items/items[unique].schema.json'),
                    },
                    '/identical': {
                        title: 'identical',
                        fetchSchema: async () => import('../schemas/keywords/items/items[identical].schema.json'),
                    },
                }
            },
            '/type': {
                title: 'type',
                children: {
                    '/array': {
                        title: 'array',
                        fetchSchema: async () => import('../schemas/keywords/type/type[array].schema.json'),
                    },
                    '/boolean': {
                        title: 'name',
                        fetchSchema: async () => import('../schemas/keywords/type/type[boolean].schema.json'),
                    },
                    '/integer': {
                        title: 'integer',
                        fetchSchema: async () => import('../schemas/keywords/type/type[integer].schema.json'),
                    },
                    '/null': {
                        title: 'null',
                        fetchSchema: async () => import('../schemas/keywords/type/type[null].schema.json'),
                    },
                    '/number': {
                        title: 'number',
                        fetchSchema: async () => import('../schemas/keywords/type/type[number].schema.json'),
                    },
                    '/object': {
                        title: 'object',
                        fetchSchema: async () => import('../schemas/keywords/type/type[object].schema.json'),
                    },
                    '/string': {
                        title: 'string',
                        fetchSchema: async () => import('../schemas/keywords/type/type[string].schema.json'),
                    },
                }
            },
            '/$comment': {
                title: '$comment',
                fetchSchema: async () => import('../schemas/keywords/$comment.schema.json'),
            },
            '/$id': {
                title: '$id',
                fetchSchema: async () => import('../schemas/keywords/$id.schema.json'),
            },
            '/const': {
                title: 'const',
                fetchSchema: async () => import('../schemas/keywords/const.schema.json'),
            },
            '/contains': {
                title: 'contains',
                fetchSchema: async () => import('../schemas/keywords/contains.schema.json'),
            },
            '/description': {
                title: 'description',
                fetchSchema: async () => import('../schemas/keywords/description.schema.json'),
            },
            '/enum': {
                title: 'enum',
                fetchSchema: async () => import('../schemas/keywords/enum.schema.json'),
            },
            '/examples': {
                title: 'examples',
                fetchSchema: async () => import('../schemas/keywords/examples.schema.json'),
            },
            '/exclusiveMinimum': {
                title: 'exclusiveMinimum',
                fetchSchema: async () => import('../schemas/keywords/exclusiveMinimum.schema.json'),
            },
            '/exclusiveMaximum': {
                title: 'exclusiveMaximum',
                fetchSchema: async () => import('../schemas/keywords/exclusiveMaximum.schema.json'),
            },
            '/if-then-else': {
                title: 'if-then-else',
                fetchSchema: async () => import('../schemas/keywords/if-then-else.schema.json'),
            },
            '/maximum': {
                title: 'maximum',
                fetchSchema: async () => import('../schemas/keywords/maximum.schema.json'),
            },
            '/maxItems': {
                title: 'maxItems',
                fetchSchema: async () => import('../schemas/keywords/maxItems.schema.json'),
            },
            '/maxLength': {
                title: 'maxLength',
                fetchSchema: async () => import('../schemas/keywords/maxLength.schema.json'),
            },
            '/maxProperties': {
                title: 'maxProperties',
                fetchSchema: async () => import('../schemas/keywords/maxProperties.schema.json'),
            },
            '/minimum': {
                title: 'minimum',
                fetchSchema: async () => import('../schemas/keywords/minimum.schema.json'),
            },
            '/minItems': {
                title: 'minItems',
                fetchSchema: async () => import('../schemas/keywords/minItems.schema.json'),
            },
            '/minLength': {
                title: 'minLength',
                fetchSchema: async () => import('../schemas/keywords/minLength.schema.json'),
            },
            '/minProperties': {
                title: 'minProperties',
                fetchSchema: async () => import('../schemas/keywords/minProperties.schema.json'),
            },
            '/multipleOf': {
                title: 'multipleOf',
                fetchSchema: async () => import('../schemas/keywords/multipleOf.schema.json'),
            },
            '/not': {
                title: 'not',
                fetchSchema: async () => import('../schemas/keywords/not.schema.json'),
            },
            '/oneOf': {
                title: 'oneOf',
                fetchSchema: async () => import('../schemas/keywords/oneOf.schema.json'),
            },
            '/pattern': {
                title: 'pattern',
                fetchSchema: async () => import('../schemas/keywords/pattern.schema.json'),
            },
            '/patternProperties': {
                title: 'patternProperties',
                fetchSchema: async () => import('../schemas/keywords/patternProperties.schema.json'),
            },
            '/properties': {
                title: 'properties',
                fetchSchema: async () => import('../schemas/keywords/properties.schema.json'),
            },
            '/propertyNames': {
                title: 'propertyNames',
                fetchSchema: async () => import('../schemas/keywords/propertyNames.schema.json'),
            },
            '/readOnly': {
                title: 'readOnly',
                fetchSchema: async () => import('../schemas/keywords/readOnly.schema.json'),
            },
            '/required': {
                title: 'required',
                fetchSchema: async () => import('../schemas/keywords/required.schema.json'),
            },
            '/title': {
                title: 'title',
                fetchSchema: async () => import('../schemas/keywords/title.schema.json'),
            },
            '/uniqueItems': {
                title: 'uniqueItems',
                fetchSchema: async () => import('../schemas/keywords/uniqueItems.schema.json'),
            },
            '/writeOnly': {
                title: 'writeOnly',
                fetchSchema: async () => import('../schemas/keywords/writeOnly.schema.json'),
            },
            '/x-errorMessages': {
                title: 'x-errorMessages',
                fetchSchema: async () => import('../schemas/keywords/x-errorMessages.schema.json'),
            }
        }
    }
}
