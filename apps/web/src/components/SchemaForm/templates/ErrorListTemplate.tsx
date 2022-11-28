import React from "react";
import {ErrorListProps} from "@rjsf/utils";
import ErrorList from "../components/ErrorList";

export function ErrorListTemplate(props: ErrorListProps) {
    const rawErrors = props.errors.map(item => item.stack);

    return (
        <ErrorList errors={rawErrors} />
    );
}

export default ErrorListTemplate;
