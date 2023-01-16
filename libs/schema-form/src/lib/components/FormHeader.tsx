import React, {ReactNode} from "react";
import {ListItemText, ListItemTextProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
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
    const hasErrors = Boolean(props?.errorMessages?.length);
    const hasHelperText = Boolean(props.helperText);
    const hasLabelAndHelper = hasLabel && hasHelperText;

    if (hasErrors) {
      return (
        <ErrorList
          title={props.label}
          errors={props?.errorMessages || []}
        />
      );
    }

    const label = hasLabel ? (
        <Typography
            component="legend"
            variant="body1"
            fontWeight="bolder"
            color={hasErrors ? 'error' : 'textPrimary'}
            sx={{px: 0}}
        >
            {props?.label}
        </Typography>
    ) : null;

    const helperText = hasHelperText ? (
        <Typography
            component="p"
            variant="body2"
            color={hasErrors ? 'error' : 'textSecondary'}
            sx={{mt: .5}}
        >
            {props?.helperText}
        </Typography>
    ) : null;

    return (
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
}
