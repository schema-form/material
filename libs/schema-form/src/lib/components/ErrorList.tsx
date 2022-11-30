import {ReactNode} from 'react';
import {Alert, Stack} from "@mui/material";

export type ErrorListProps = {
    className?: string;
    errors: string[];
}

export function ErrorList(props: ErrorListProps) {
    const { className, errors } = props;

    const renderError = (errorMessage: ReactNode, index: number) => (
        <Alert key={index} severity="error">
            {errorMessage}
        </Alert>
    );

    return (
        <Stack className={className} spacing={1}>
            {errors?.map(renderError)}
        </Stack>
    );
}

export default ErrorList;
