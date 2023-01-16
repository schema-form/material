import React, {ReactNode, useState} from 'react';
import {Alert, Box, Collapse} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import AnimatedExpandIcon from "./AnimatedExpandIcon";
import IconButton from "@mui/material/IconButton";

export type ErrorListProps = {
    className?: string;
    title?: ReactNode;
    errors: ReactNode[];
}

export function ErrorList(props: ErrorListProps) {
    const { className, errors } = props;
    const [isExpanded, setExpanded] = useState(false);
    const primaryError = errors?.[0];
    const secondaryErrors = errors?.slice(1);
    const hasSecondaryErrors = Boolean(secondaryErrors?.length);
    const toggleExpanded = () => setExpanded(!isExpanded);

    const renderError = (errorMessage: ReactNode, index: number) => (
      <Box key={index} sx={{mt: .25}}>
        {errorMessage}
      </Box>
    )

    const errorsCollapse = (
      <Collapse in={isExpanded} unmountOnExit={true}>
        {secondaryErrors.map(renderError)}
      </Collapse>
    );

    const alertTitle = props?.title ? (
      <AlertTitle>
        <b>{props?.title}</b>
      </AlertTitle>
    ) : null;

    const toggleButton = hasSecondaryErrors ? (
      <IconButton
        size="small"
        color="error"
        onClick={toggleExpanded}
        sx={{mt: -.25}}
      >
        <AnimatedExpandIcon
          isExpanded={isExpanded}
          edge="end"
        />
      </IconButton>
    ) : null;

    return (
      <Alert
        severity="error"
        className={className}
        onClick={toggleExpanded}
        action={toggleButton}
        sx={{cursor: hasSecondaryErrors ? 'pointer' : undefined}}
      >
        {alertTitle}
        <Box>{primaryError}</Box>
        {errorsCollapse}
      </Alert>
    );
}

export default ErrorList;
