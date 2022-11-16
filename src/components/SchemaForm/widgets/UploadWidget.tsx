import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {Upload, UploadProps} from "../components/Upload";
import {mapControlProps} from "../utils/maps/mapControlProps";

export function mapUploadButtonProps(props: WidgetProps<any, SchemaFormContext>): UploadProps {
    const { size, variant, onChange, ...commonProps } = mapControlProps(props);
    const isStringType = props.schema.type === 'string';
    return {
        ...commonProps,
        accept: props.schema.contentMediaType,
        onChange: (event, values) => {
            const newValue = isStringType
                ? values?.filesAsDataURLs?.[0]
                : values?.filesAsDataURLs;
            props.onChange?.(newValue);
        }
    }
}

export default function UploadWidget(props: WidgetProps<any, SchemaFormContext>) {
    const uploadButtonProps = mapUploadButtonProps(props);

    return (
        <Upload {...uploadButtonProps} />
    );
}
