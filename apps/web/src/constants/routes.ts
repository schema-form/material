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

export const DEFAULT_APP_ROUTE_PATH = '/keywords/$ref';

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
            fetchSchema: async () => import('../examples/keywords/additionalItems.schema.json'),
        },
        '/additionalProperties': {
            title: 'additionalProperties',
            fetchSchema: async () => import('../examples/keywords/additionalProperties.schema.json'),
        },
        '/allOf': {
            title: 'allOf',
            fetchSchema: async () => import('../examples/keywords/allOf.schema.json'),
        },
        '/anyOf': {
            title: 'anyOf',
            fetchSchema: async () => import('../examples/keywords/anyOf.schema.json'),
        },
        '/contentEncoding': {
            title: 'contentEncoding',
            fetchSchema: async () => import('../examples/keywords/contentEncoding.schema.json'),
        },
        '/contentMediaType': {
            title: 'contentMediaType',
            fetchSchema: async () => import('../examples/keywords/contentMediaType.schema.json'),
        },
        '/default': {
            title: 'default',
            fetchSchema: async () => import('../examples/keywords/default.schema.json'),
        },
        '/definitions': {
            title: 'definitions',
            fetchSchema: async () => import('../examples/keywords/definitions.schema.json'),
        },
        '/dependencies': {
            title: 'dependencies',
            fetchSchema: async () => import('../examples/keywords/dependencies.schema.json'),
        },
        '/format': {
            title: 'format',
            fetchSchema: async () => import('../examples/keywords/format.schema.json'),
        },
        '/items': {
            title: 'items',
            fetchSchema: async () => import('../examples/keywords/items.schema.json'),
        },
        '/type': {
            title: 'type',
            fetchSchema: async () => import('../examples/keywords/type.schema.json'),
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
            title: 'if / then / else',
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
