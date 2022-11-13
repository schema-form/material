import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {Upload, UploadProps} from "../components/Upload";
import {mapControlProps} from "../utils/maps/mapControlProps";

export function mapUploadButtonProps(props: WidgetProps<any, SchemaFormContext>): UploadProps {
    const { size, variant, onChange, ...commonProps } = mapControlProps(props);
    return {
        ...commonProps,
        accept: props.schema.contentMediaType,
        onChange: (event) => {
            const file = event.target?.files?.item(0);
            onChange(event);
        }
    }
}

export default function UploadWidget(props: WidgetProps<any, SchemaFormContext>) {
    const uploadButtonProps = mapUploadButtonProps(props);

    return (
        <Upload {...uploadButtonProps} />
    );
}
