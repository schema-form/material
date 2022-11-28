import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {mapTextFieldProps} from "./TextFieldWidget";
import ColorField, {ColorFieldProps} from "../components/ColorField";
import {SchemaFormContext} from "../SchemaForm";

export function mapColorFieldProps(props: WidgetProps<any, any, SchemaFormContext>): ColorFieldProps {
    return mapTextFieldProps(props);
}

export default function ColorFieldWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const colorFieldProps = mapColorFieldProps(props);
    return <ColorField {...colorFieldProps} data-testid="ColorFieldWidget" />
}
