import {WidgetProps} from "@rjsf/utils";
import React from "react";
import {mapTextFieldProps} from "./TextFieldWidget";
import PasswordField, {PasswordFieldProps} from "../components/PasswordField";
import {SchemaFormContext} from "../SchemaForm";

export function mapPasswordFieldProps(props: WidgetProps<any, SchemaFormContext>): PasswordFieldProps {
    return mapTextFieldProps(props)
}

export default function PasswordFieldWidget(props: WidgetProps<any, SchemaFormContext>) {
    const passwordFieldProps = mapPasswordFieldProps(props);
    return <PasswordField {...passwordFieldProps} data-testid="PasswordFieldWidget" />
}
