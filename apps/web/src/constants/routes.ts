export type AppRoutes = {
    [key: string]: AppRouteProps
}

export type AppRouteProps = {
    pathname?: string;
    title?: string;
    description?: string;
    fetchSchema?: () => Promise<any>;
    docsURL?: string;
    fetchProps?: () => Promise<any>;
    fetchUiSchema?: () => Promise<any>;
    children?: AppRoutes;
}

export const DEFAULT_APP_ROUTE_PATH = '/keywords/$ref/properties';

export const gettingStartedRoutes: AppRouteProps = {
    title: 'Getting started',
    children: {
        '/overview': {
            title: 'Overview',
            docsURL: require('../examples/gettingStarted/overview.md')
        },
        '/installation': {
            title: 'Installation',
            docsURL: require('../examples/gettingStarted/installation.md')
        }
    }
}

export const keywordsRoutes: AppRouteProps = {
    title: 'Keywords',
    children: {
        '/$ref': {
            title: '$ref',
            fetchSchema: async () => import('../examples/keywords/$ref.schema.json'),
        },
        '/additionalItems': {
            title: 'additionalItems',
            fetchSchema: async () => import('../examples/keywords/additionalItems[schema].schema.json'),
        },
        '/additionalProperties': {
            title: 'additionalProperties',
            fetchSchema: async () => import('../examples/keywords/additionalProperties[schema].schema.json'),
        },
        '/allOf': {
            title: 'allOf',
            fetchSchema: async () => import('../examples/keywords/allOf[properties].schema.json'),
        },
        '/anyOf': {
            title: 'anyOf',
            children: {
                '/options': {
                    title: 'options',
                    fetchSchema: async () => import('../examples/keywords/anyOf/anyOf[const].schema.json'),
                },
                '/rules': {
                    title: 'rules',
                    fetchSchema: async () => import('../examples/keywords/anyOf/anyOf[keyword].schema.json'),
                },
            }
        },
        '/contentEncoding': {
            title: 'contentEncoding',
            children: {
                '/main': {
                    title: 'main',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding.schema.json'),
                },
                '/base64': {
                    title: 'base64',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding[base64].schema.json'),
                },
                '/7bit': {
                    title: '7bit',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding[7bit].schema.json'),
                },
                '/8bit': {
                    title: '8bit',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding[8bit].schema.json'),
                },
                '/binary': {
                    title: 'binary',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding[binary].schema.json'),
                },
                '/quoted-printable': {
                    title: 'quoted-printable',
                    fetchSchema: async () => import('../examples/keywords/contentEncoding/contentEncoding[quoted-printable].schema.json'),
                },
            }
        },
        '/contentMediaType': {
            title: 'contentMediaType',
            children: {
                '/jpeg': {
                    title: 'jpeg',
                    fetchSchema: async () => import('../examples/keywords/contentMediaType/contentMediaType[jpeg].schema.json'),
                },
                '/json': {
                    title: 'json',
                    fetchSchema: async () => import('../examples/keywords/contentMediaType/contentMediaType[json].schema.json'),
                },
                '/pdf': {
                    title: 'pdf',
                    fetchSchema: async () => import('../examples/keywords/contentMediaType/contentMediaType[pdf].schema.json'),
                },
                '/xml': {
                    title: 'xml',
                    fetchSchema: async () => import('../examples/keywords/contentMediaType/contentMediaType[xml].schema.json'),
                },
                '/yaml': {
                    title: 'yaml',
                    fetchSchema: async () => import('../examples/keywords/contentMediaType/contentMediaType[yaml].schema.json'),
                },
            }
        },
        '/default': {
            title: 'default',
            children: {
                '/checkbox': {
                    title: 'checkbox',
                    fetchSchema: async () => import('../examples/keywords/default/default[boolean].schema.json'),
                },
                '/select': {
                    title: 'select',
                    fetchSchema: async () => import('../examples/keywords/default/default[enum].schema.json'),
                },
                '/input': {
                    title: 'input',
                    fetchSchema: async () => import('../examples/keywords/default/default[integer].schema.json'),
                },
            }
        },
        '/definitions': {
            title: 'definitions',
            children: {
                '/properties': {
                    title: 'properties',
                    fetchSchema: async () => import('../examples/keywords/definitions/definitions[properties].schema.json'),
                },
                '/property': {
                    title: 'property',
                    fetchSchema: async () => import('../examples/keywords/definitions/definitions[property].schema.json'),
                },
            }
        },
        '/dependencies': {
            title: 'dependencies',
            children: {
                '/propertyNames': {
                    title: 'propertyNames',
                    fetchSchema: async () => import('../examples/keywords/dependencies/dependencies[propertyNames].schema.json'),
                },
                '/schema': {
                    title: 'schema',
                    fetchSchema: async () => import('../examples/keywords/dependencies/dependencies[schema].schema.json'),
                },
            }
        },
        '/format': {
            title: 'format',
            children: {
                '/color': {
                    title: 'color',
                    fetchSchema: async () => import('../examples/keywords/format/format[color].schema.json'),
                },
                '/date': {
                    title: 'date',
                    fetchSchema: async () => import('../examples/keywords/format/format[date].schema.json'),
                },
                '/email': {
                    title: 'email',
                    fetchSchema: async () => import('../examples/keywords/format/format[email].schema.json'),
                },
                '/hostname': {
                    title: 'hostname',
                    fetchSchema: async () => import('../examples/keywords/format/format[hostname].schema.json'),
                },
                '/ipv4': {
                    title: 'ipv4',
                    fetchSchema: async () => import('../examples/keywords/format/format[ipv4].schema.json'),
                },
                '/data-url': {
                    title: 'data-url',
                    fetchSchema: async () => import('../examples/keywords/format/format[data-url].schema.json'),
                },
                '/date-time': {
                    title: 'date-time',
                    fetchSchema: async () => import('../examples/keywords/format/format[date-time].schema.json'),
                },
                '/ipv6': {
                    title: 'ipv6',
                    fetchSchema: async () => import('../examples/keywords/format/format[ipv6].schema.json'),
                },
                '/json-pointer': {
                    title: 'json-pointer',
                    fetchSchema: async () => import('../examples/keywords/format/format[json-pointer].schema.json'),
                },
                '/password': {
                    title: 'password',
                    fetchSchema: async () => import('../examples/keywords/format/format[password].schema.json'),
                },
                '/regex': {
                    title: 'regex',
                    fetchSchema: async () => import('../examples/keywords/format/format[regex].schema.json'),
                },
                '/uri': {
                    title: 'uri',
                    fetchSchema: async () => import('../examples/keywords/format/format[uri].schema.json'),
                },
                '/uuid': {
                    title: 'uuid',
                    fetchSchema: async () => import('../examples/keywords/format/format[uuid].schema.json'),
                },
            }
        },
        '/items': {
            title: 'items',
            children: {
                '/unique': {
                    title: 'unique',
                    fetchSchema: async () => import('../examples/keywords/items/items[array].schema.json'),
                },
                '/identical': {
                    title: 'identical',
                    fetchSchema: async () => import('../examples/keywords/items/items[schema].schema.json'),
                },
            }
        },
        '/type': {
            title: 'type',
            children: {
                '/array': {
                    title: 'array',
                    fetchSchema: async () => import('../examples/keywords/type/type[array].schema.json'),
                },
                '/boolean': {
                    title: 'name',
                    fetchSchema: async () => import('../examples/keywords/type/type[boolean].schema.json'),
                },
                '/integer': {
                    title: 'integer',
                    fetchSchema: async () => import('../examples/keywords/type/type[integer].schema.json'),
                },
                '/null': {
                    title: 'null',
                    fetchSchema: async () => import('../examples/keywords/type/type[null].schema.json'),
                },
                '/number': {
                    title: 'number',
                    fetchSchema: async () => import('../examples/keywords/type/type[number].schema.json'),
                },
                '/object': {
                    title: 'object',
                    fetchSchema: async () => import('../examples/keywords/type/type[object].schema.json'),
                },
                '/string': {
                    title: 'string',
                    fetchSchema: async () => import('../examples/keywords/type/type[string].schema.json'),
                },
            }
        },
        '/$comment': {
            title: '$comment',
            fetchSchema: async () => import('../examples/keywords/$comment.schema.json'),
        },
        '/$id': {
            title: '$id',
            fetchSchema: async () => import('../examples/keywords/$id.schema.json'),
        },
        '/const': {
            title: 'const',
            fetchSchema: async () => import('../examples/keywords/const.schema.json'),
        },
        '/contains': {
            title: 'contains',
            fetchSchema: async () => import('../examples/keywords/contains.schema.json'),
        },
        '/description': {
            title: 'description',
            fetchSchema: async () => import('../examples/keywords/description.schema.json'),
        },
        '/enum': {
            title: 'enum',
            fetchSchema: async () => import('../examples/keywords/enum.schema.json'),
        },
        '/examples': {
            title: 'examples',
            fetchSchema: async () => import('../examples/keywords/examples.schema.json'),
        },
        '/exclusiveMinimum': {
            title: 'exclusiveMinimum',
            fetchSchema: async () => import('../examples/keywords/exclusiveMinimum.schema.json'),
        },
        '/exclusiveMaximum': {
            title: 'exclusiveMaximum',
            fetchSchema: async () => import('../examples/keywords/exclusiveMaximum.schema.json'),
        },
        '/if-then-else': {
            title: 'if-then-else',
            fetchSchema: async () => import('../examples/keywords/if-then-else.schema.json'),
        },
        '/maximum': {
            title: 'maximum',
            fetchSchema: async () => import('../examples/keywords/maximum.schema.json'),
        },
        '/maxItems': {
            title: 'maxItems',
            fetchSchema: async () => import('../examples/keywords/maxItems.schema.json'),
        },
        '/maxLength': {
            title: 'maxLength',
            fetchSchema: async () => import('../examples/keywords/maxLength.schema.json'),
        },
        '/maxProperties': {
            title: 'maxProperties',
            fetchSchema: async () => import('../examples/keywords/maxProperties.schema.json'),
        },
        '/minimum': {
            title: 'minimum',
            fetchSchema: async () => import('../examples/keywords/minimum.schema.json'),
        },
        '/minItems': {
            title: 'minItems',
            fetchSchema: async () => import('../examples/keywords/minItems.schema.json'),
        },
        '/minLength': {
            title: 'minLength',
            fetchSchema: async () => import('../examples/keywords/minLength.schema.json'),
        },
        '/minProperties': {
            title: 'minProperties',
            fetchSchema: async () => import('../examples/keywords/minProperties.schema.json'),
        },
        '/multipleOf': {
            title: 'multipleOf',
            fetchSchema: async () => import('../examples/keywords/multipleOf.schema.json'),
        },
        '/not': {
            title: 'not',
            fetchSchema: async () => import('../examples/keywords/not.schema.json'),
        },
        '/oneOf': {
            title: 'oneOf',
            fetchSchema: async () => import('../examples/keywords/oneOf.schema.json'),
        },
        '/pattern': {
            title: 'pattern',
            fetchSchema: async () => import('../examples/keywords/pattern.schema.json'),
        },
        '/patternProperties': {
            title: 'patternProperties',
            fetchSchema: async () => import('../examples/keywords/patternProperties.schema.json'),
        },
        '/properties': {
            title: 'properties',
            fetchSchema: async () => import('../examples/keywords/properties.schema.json'),
        },
        '/propertyNames': {
            title: 'propertyNames',
            fetchSchema: async () => import('../examples/keywords/propertyNames.schema.json'),
        },
        '/readOnly': {
            title: 'readOnly',
            fetchSchema: async () => import('../examples/keywords/readOnly.schema.json'),
        },
        '/required': {
            title: 'required',
            fetchSchema: async () => import('../examples/keywords/required.schema.json'),
        },
        '/title': {
            title: 'title',
            fetchSchema: async () => import('../examples/keywords/title.schema.json'),
        },
        '/uniqueItems': {
            title: 'uniqueItems',
            fetchSchema: async () => import('../examples/keywords/uniqueItems.schema.json'),
        },
        '/writeOnly': {
            title: 'writeOnly',
            fetchSchema: async () => import('../examples/keywords/writeOnly.schema.json'),
        },
        '/x-errorMessage': {
            title: 'x-errorMessage',
            fetchSchema: async () => import('../examples/keywords/x-errorMessage.schema.json'),
        }
    }
}

export const widgetsRoutes: AppRouteProps = {
    title: 'Widgets',
    children: {
        '/autocomplete': {
            title: 'Autocomplete',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/autocomplete/autocomplete[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/autocomplete/autocomplete[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/autocomplete/autocomplete[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/autocomplete/autocomplete[examples].ui-schema.json'),
              }
            }
        },
        '/checkbox': {
            title: 'Checkbox',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/checkbox/checkbox[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/checkbox/checkbox[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/checkbox/checkbox[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/checkbox/checkbox[examples].ui-schema.json'),
              }
            }
        },
        '/checkbox-group': {
            title: 'CheckboxGroup',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/checkbox-group/checkbox-group[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/checkbox-group/checkbox-group[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/checkbox-group/checkbox-group[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/checkbox-group/checkbox-group[examples].ui-schema.json'),
              }
            }
        },
        '/color-field': {
            title: 'ColorField',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/color-field/color-field[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/color-field/color-field[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/color-field/color-field[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/color-field/color-field[examples].ui-schema.json'),
              }
            }
        },
        '/date-picker': {
            title: 'DatePicker',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/date-picker/date-picker[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/date-picker/date-picker[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/date-picker/date-picker[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/date-picker/date-picker[examples].ui-schema.json'),
              }
            }
        },
        '/date-time-picker': {
            title: 'DateTimePicker',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/date-time-picker/date-time-picker[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/date-time-picker/date-time-picker[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/date-time-picker/date-time-picker[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/date-time-picker/date-time-picker[examples].ui-schema.json'),
              }
            }
        },
        '/editor': {
            title: 'Editor',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/editor/editor[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/editor/editor[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/editor/editor[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/editor/editor[examples].ui-schema.json'),
              }
            }
        },
        '/markdown-editor': {
            title: 'MarkdownEditor',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/markdown-editor/markdown-editor[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/markdown-editor/markdown-editor[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/markdown-editor/markdown-editor[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/markdown-editor/markdown-editor[examples].ui-schema.json'),
              }
            }
        },
        '/password-field': {
            title: 'PasswordField',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/password-field/password-field[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/password-field/password-field[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/password-field/password-field[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/password-field/password-field[examples].ui-schema.json'),
              }
            }
        },
        '/radio-group': {
            title: 'RadioGroup',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/radio-group/radio-group[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/radio-group/radio-group[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/radio-group/radio-group[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/radio-group/radio-group[examples].ui-schema.json'),
              }
            }
        },
        '/schema-editor': {
            title: 'SchemaEditor',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/schema-editor/schema-editor[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/schema-editor/schema-editor[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/schema-editor/schema-editor[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/schema-editor/schema-editor[examples].ui-schema.json'),
              }
            }
        },
        '/select': {
            title: 'Select',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/select/select[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/select/select[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/select/select[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/select/select[examples].ui-schema.json'),
              }
            }
        },
        '/slider': {
            title: 'Slider',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/slider/slider[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/slider/slider[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/slider/slider[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/slider/slider[examples].ui-schema.json'),
              }
            }
        },
        '/slider-field': {
            title: 'SliderField',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/slider-field/slider-field[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/slider-field/slider-field[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/slider-field/slider-field[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/slider-field/slider-field[examples].ui-schema.json'),
              }
            }
        },
        '/switch': {
            title: 'Switch',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/switch/switch[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/switch/switch[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/switch/switch[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/switch/switch[examples].ui-schema.json'),
              }
            }
        },
        '/text-field': {
            title: 'TextField',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/text-field/text-field[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/text-field/text-field[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/text-field/text-field[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/text-field/text-field[examples].ui-schema.json'),
              }
            }
        },
        '/time-picker': {
            title: 'TimePicker',
            children: {
              '/states': {
                title: 'States',
                fetchSchema: () => import('../examples/widgets/time-picker/time-picker[states].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/time-picker/time-picker[states].ui-schema.json'),
              },
              '/examples': {
                title: 'Examples',
                fetchSchema: () => import('../examples/widgets/time-picker/time-picker[examples].schema.json'),
                fetchUiSchema: () => import('../examples/widgets/time-picker/time-picker[examples].ui-schema.json'),
              }
            }
        },
        '/upload': {
            title: 'Upload',
            children: {
                '/states': {
                    title: 'States',
                    fetchSchema: () => import('../examples/widgets/upload/upload[states].schema.json'),
                    fetchUiSchema: () => import('../examples/widgets/upload/upload[states].ui-schema.json'),
                },
                '/examples': {
                  title: 'Examples',
                  fetchSchema: () => import('../examples/widgets/upload/upload[examples].schema.json'),
                  fetchUiSchema: () => import('../examples/widgets/upload/upload[examples].ui-schema.json'),
                }
            },
        }
    }
}

export const appRoutes: AppRoutes = ({
    '/getting-started': gettingStartedRoutes,
    '/keywords': keywordsRoutes,
    '/widgets': widgetsRoutes,
})
