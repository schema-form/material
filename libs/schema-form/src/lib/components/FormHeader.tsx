import React, {ReactNode, useState} from "react";
import {Box, Collapse, ListItemButton, ListItemText, ListItemTextProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import ExpandIcon from "./ExpandIcon";
import ErrorList from "./ErrorList";

export type FormHeaderProps = {
    className?: string;
    hidden?: boolean;
    error?: boolean;
    disabled?: boolean;
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['secondary'];
    errorMessages?: ListItemTextProps['secondary'][];
    secondaryAction?: ReactNode;
}

export function FormHeader(props: FormHeaderProps) {
    const hasLabel = Boolean(props.label);
    const hasError = Boolean(props?.errorMessages?.length);
    const hasHelperText = Boolean(props.helperText);
    const hasLabelAndHelper = hasLabel && hasHelperText;

    const errorList = (
      <ErrorList
        title={props.label}
        errors={props?.errorMessages || []}
      />
    );

    const label = hasLabel ? (
        <Typography
            component="legend"
            variant="body1"
            fontWeight="bolder"
            color={hasError ? 'error' : 'textPrimary'}
            sx={{px: 0}}
        >
            {props?.label}
        </Typography>
    ) : null;

    const helperText = hasHelperText ? (
        <Typography
            component="p"
            variant="body2"
            color={hasError ? 'error' : 'textSecondary'}
            sx={{mt: .5}}
        >
            {props?.helperText}
        </Typography>
    ) : null;

    const listItem = (
        <ListItem
            component="header"
            className={props.className}
            hidden={props.hidden}
            disableGutters={true}
            disablePadding={true}
            disabled={props?.disabled}
            secondaryAction={props?.secondaryAction}
            sx={{mb: hasLabelAndHelper ? 1 : .5}}
        >
            <ListItemText
              sx={{my: 0}}
              primary={label}
              secondary={helperText}
            />
        </ListItem>
    );

    return hasError ? errorList : listItem;
}
