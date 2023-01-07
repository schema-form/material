import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";
import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {ListItemButtonProps} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText, {ListItemTextProps} from "@mui/material/ListItemText";
import Typography, {TypographyProps} from "@mui/material/Typography";
import FormCard from "./FormCard";

export type CheckboxListItemProps = {
    isGroupOption?: boolean;
    value?: CheckboxProps['value'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['title'];
    disabled?: CheckboxProps['disabled'];
    hidden?: CheckboxProps['hidden'];
    checked?: CheckboxProps['checked'];
    indeterminate?: CheckboxProps['indeterminate'];
    error?: boolean;
    onChange?: CheckboxProps['onChange'];
    sx?: ListItemButtonProps['sx'];
}

const typographyStyles: TypographyProps['style'] = {
  // whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export function CheckboxListItem(props: CheckboxListItemProps) {
    const id = useMemo(uuid, []);
    const {error: hasError, helperText, isGroupOption} = props;
    const createValueLabel = () => typeof props?.value === 'string'
      ? props?.value
      : JSON.stringify(props?.value);
    const label = props?.label ?? createValueLabel();
    const optionPaddingY = helperText ? undefined : 0;

    const primaryText = label ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
            style={typographyStyles}
        >
            {label}
        </Typography>
    ) : null;

    const secondaryText = helperText ? (
      <Typography
        component="p"
        variant="caption"
        color={hasError ? 'error' : 'textSecondary'}
        style={typographyStyles}
      >
        {helperText}
      </Typography>
    ) : null;

    const listItem = (
      <ListItem disablePadding>
        <ListItemButton
          component="label"
          htmlFor={id}
          disabled={props?.disabled}
          selected={props.checked}
          hidden={props?.hidden}
          sx={{
            py: isGroupOption ? optionPaddingY : .5,
            ...props.sx
          }}
        >
          <ListItemIcon>
            <Checkbox
              id={id}
              disableRipple
              edge="start"
              disabled={props.disabled}
              checked={props.checked}
              indeterminate={props.indeterminate}
              value={props.value}
              onChange={props.onChange}
              color={hasError ? 'error' : undefined}
            />
          </ListItemIcon>
          <ListItemText
            primary={primaryText}
            secondary={secondaryText}
          />
        </ListItemButton>
      </ListItem>
    );

    return isGroupOption ? listItem : (
      <FormCard isControl={true} error={hasError}>
        {listItem}
      </FormCard>
    );
}

export default CheckboxListItem;
