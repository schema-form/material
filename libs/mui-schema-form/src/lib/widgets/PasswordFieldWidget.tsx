import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {mapTextFieldProps} from "./TextFieldWidget";
import PasswordField, {PasswordFieldProps} from "../components/PasswordField";
import {SchemaFormContext} from "../SchemaForm";

export function mapPasswordFieldProps(props: WidgetProps<any, any, SchemaFormContext>): PasswordFieldProps {
    return mapTextFieldProps(props)
}

export default function PasswordFieldWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const passwordFieldProps = mapPasswordFieldProps(props);
    return <PasswordField {...passwordFieldProps} data-testid="PasswordFieldWidget" />
}
