import React, {useMemo} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Switch, { SwitchProps } from "@mui/material/Switch";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";
import FormCard from "./FormCard";

export type SwitchListItemProps = {
    isGroupOption?: boolean;
    value?: SwitchProps['value'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['title'];
    disabled?: SwitchProps['disabled'];
    hidden?: SwitchProps['hidden'];
    checked?: SwitchProps['checked'];
    error?: boolean;
    onChange?: SwitchProps['onChange'];
    sx?: ListItemButtonProps['sx'];
}

export function SwitchListItem(props: SwitchListItemProps) {
    const {error: hasError, helperText, isGroupOption} = props;
    const createValueLabel = () => typeof props?.value === 'string'
      ? props.value
      : JSON.stringify(props?.value);
    const labelText = props?.label ?? createValueLabel();
    const id = useMemo(uuid, []);
    const optionPaddingY = helperText ? undefined : 0;
    const paddingY = isGroupOption ? optionPaddingY : .5;

    const primaryText = labelText ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {labelText}
        </Typography>
    ) : null;

    const secondaryText = helperText ? (
        <Typography
            component="p"
            variant="caption"
            color={hasError ? 'error' : 'textSecondary'}
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
            py: paddingY,
            ...props.sx
          }}
        >
          <ListItemIcon>
            <Switch
              id={id}
              disableRipple
              edge="start"
              disabled={props.disabled}
              checked={props.checked}
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
    )

    return isGroupOption ? listItem : (
      <FormCard isControl={true} error={hasError}>
        {listItem}
      </FormCard>
    );
}

export default SwitchListItem;
