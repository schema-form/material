import React, {PropsWithChildren, ReactNode} from 'react';
import {
  Box,
  CardActions,
  CardHeaderProps, CardProps,
  Collapse, CollapseProps, Fade, FormControl, FormHelperText,
  ListItem,
  ListItemButton, ListItemButtonProps, ListItemIcon, ListItemProps,
  ListItemText, Stack, styled
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ExpandIcon from "./ExpandIcon";

export type FormCardProps = PropsWithChildren<{
    variant?: CardProps['variant'];
    className?: string;
    bordered?: boolean;
    sx?: CardProps['sx'];
    error?: boolean;
    disabled?: boolean;
    isControl?: boolean;
    icon?: ReactNode;
    title?: CardHeaderProps['title'];
    subheader?: CardHeaderProps['subheader'];
    helperText?: CardHeaderProps['subheader'];
    expandedActions?: ListItemProps['secondaryAction'];
    notExpandedActions?: ListItemProps['secondaryAction'];
    secondaryActions?: ListItemProps['secondaryAction'];
    actions?: ReactNode;
    CollapseProps?: CollapseProps;
    HeaderProps?: ListItemButtonProps;
    defaultExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
}>

export type OutlinedCardProps = CardProps & {
    error?: FormCardProps['error'];
    bordered?: FormCardProps['bordered'];
    isControl?: FormCardProps['isControl'];
}

export const OutlinedCard = styled(Card)<OutlinedCardProps>(({ theme, error, bordered, isControl }) => {
    const focusedStyles = isControl ? {
        borderColor: error
            ? theme.palette.error.main
            : theme.palette.action.disabled,
        '&:hover': {
            borderColor: error
                ? theme.palette.error.main
                : theme.palette.action.active
        },
        '&:focus-within': {
            borderColor: error
                ? theme.palette.error.main
                : theme.palette.action.active,
            borderWidth: 2,
            padding: 0
        }
    } : {
        borderColor: error
            ? theme.palette.error.main
            : theme.palette.divider,
        '&:hover, &:focus-within': {
            borderColor: error
                ? theme.palette.error.main
                : theme.palette.action.disabled,
        }
    };

    const borderedStyles = bordered ? {
        ...focusedStyles
    } : {
        border: 'none',
        borderRadius: 0
    };

    return ({
        transition: 'none',
        overflow: 'hidden',
        padding: 1,
        ...borderedStyles
    })
});

export function FormCard(props: FormCardProps) {
    const {
        className,
        sx,
        variant = 'outlined',
        error: hasError,
        isControl = false,
        disabled,
        bordered = true,
        children,
        actions,
        CollapseProps,
        HeaderProps,
        defaultExpanded = true,
        onExpandedChange,
    } = props;
    const [isExpanded, setExpanded] = React.useState(defaultExpanded);
    const iconColor = hasError ? 'error' : undefined;
    const hasChildren = Boolean(children);
    const hasSecondaryActions = Boolean(props.secondaryActions);
    const hasExpandedActions = Boolean(props.expandedActions);
    const hasNotExpandedActions = Boolean(props.notExpandedActions)
    const hasActions = hasSecondaryActions || hasNotExpandedActions || hasExpandedActions;
    const subheaderText = hasError ? props?.helperText : (props.subheader || props.helperText)
    const hasSubheader = Boolean(subheaderText);
    const displaySubheader = hasSubheader && !isExpanded;

    const toggleExpand = () => {
        const newExpanded = !isExpanded;

        setExpanded(newExpanded);
        onExpandedChange?.(newExpanded);
    };

    const expandIcon = (
      <ExpandIcon
        color={iconColor}
        isExpanded={isExpanded}
      />
    );

    const title = props?.title ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {props.title}
        </Typography>
    ) : null;

    const subheader = hasSubheader ? (
      <Collapse in={!isExpanded}>
        <Typography
          component="p"
          variant="caption"
          color={hasError ? 'error' : 'textSecondary'}
        >
          {subheaderText}
        </Typography>
      </Collapse>
    ) : null;

    const formHelperText = props.helperText ? (
      <Collapse in={isExpanded}>
        <FormHelperText>
            {props.helperText}
        </FormHelperText>
      </Collapse>
    ) : null;

    const expandedActions = hasExpandedActions && (
      <Fade in={isExpanded} appear={false} unmountOnExit={true}>
        <Box>
          {props?.expandedActions}
        </Box>
      </Fade>
    );

    const notExpandedActions = hasNotExpandedActions && (
      <Fade in={!isExpanded} appear={false} unmountOnExit={true}>
        <Box>
          {props?.notExpandedActions}
        </Box>
      </Fade>
    );

    const secondaryActions = (
      <Box>
        {props?.secondaryActions}
      </Box>
    );

    const headerActions = hasActions && (
        <Stack direction="row" spacing={.5}>
            {expandedActions}
            {notExpandedActions}
            {secondaryActions}
        </Stack>
    );

    const hasHeader = title || displaySubheader || headerActions;

    const icon = hasChildren ? expandIcon : props.icon;
    const expandListItemIcon = icon && (
        <ListItemIcon>
            {icon}
        </ListItemIcon>
    )

    const header = hasHeader ? (
        <ListItem
            component="header"
            disablePadding
            secondaryAction={headerActions}
        >
            <ListItemButton
                dense={false}
                disabled={disabled}
                onClick={toggleExpand}
                sx={{py: hasSubheader ? .5 : .75}}
                {...HeaderProps}
            >
                {expandListItemIcon}
                <ListItemText
                    primary={title}
                    secondary={subheader}
                />
            </ListItemButton>
        </ListItem>
    ) : null;

    const footer = actions ? (
        <CardActions>
            {actions}
        </CardActions>
    ) : null;

    const collapse = (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit {...CollapseProps}>
            {children}
            {footer}
        </Collapse>
    )

    return (
        <FormControl
            error={hasError}
            disabled={props.disabled}
        >
            <OutlinedCard
                bordered={bordered}
                isControl={isControl}
                error={hasError}
                variant={variant}
                className={className}
                sx={sx}
            >
                {header}
                {collapse}
            </OutlinedCard>
            {formHelperText}
        </FormControl>
    )
}

export default FormCard;
