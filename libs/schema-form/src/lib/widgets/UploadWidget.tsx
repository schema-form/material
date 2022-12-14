import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import Upload, {UploadProps} from "../components/Upload";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";

export function mapUploadProps(props: WidgetProps<any, any, SchemaFormContext>): UploadProps {
    const { size, variant, onChange, ...commonProps } = mapControlProps(props);
    const isStringType = props.schema.type === 'string';
    return {
        ...commonProps,
        accept: props.schema?.contentMediaType,
        maxItems: props.schema?.maxItems,
        onChange: (value) => {
            const newValue = isStringType
                ? value?.[0]
                : value;
            props.onChange?.(newValue);
        }
    }
}

export default function UploadWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const uploadButtonProps = mapUploadProps(props);

    return (
        <Upload {...uploadButtonProps} />
    );
}
