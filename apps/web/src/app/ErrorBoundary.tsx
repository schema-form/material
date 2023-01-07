import React from "react";
import {Component, PropsWithChildren} from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type ErrorBoundaryState = {
    hasError?: boolean;
    error?: Error;
}

export type ErrorBoundaryProps = PropsWithChildren;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    override state: ErrorBoundaryState = {
        hasError: false
    }

    override componentDidCatch(error: Error) {
        this.setState({
            hasError: true,
            error
        });
    }

    override render() {
        if (this.state?.hasError) {
            const errorMessage = this.state?.error?.message;
            const hasErrorMessage = Boolean(errorMessage);

            return (
                <Alert
                  variant="filled"
                  color="error"
                >
                    <AlertTitle sx={{m: hasErrorMessage ? undefined : 0}}>
                        Oops! Something went wrong
                    </AlertTitle>
                    {errorMessage}
                </Alert>
            )
        }

        return (
            <>{this.props?.children}</>
        );
    }
}

export default ErrorBoundary;
