import React, {PropsWithChildren, ReactNode} from 'react';
import {
    CardActions,
    CardHeaderProps, CardProps,
    Collapse, CollapseProps, FormControl, FormHelperText,
    ListItem,
    ListItemButton, ListItemButtonProps, ListItemIcon, ListItemProps,
    ListItemText, styled,
} from "@mui/material";
import {
    KeyboardArrowRight,
    KeyboardArrowDown,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export type FormCardProps = PropsWithChildren<{
    variant?: CardProps['variant'];
    className?: string;
    bordered?: boolean;
    sx?: CardProps['sx'];
    error?: boolean;
    disabled?: boolean;
    isControl?: boolean;
    icon?: ReactNode;
    label?: CardHeaderProps['title'];
    helperText?: CardHeaderProps['subheader'];
    expandedActions?: ListItemProps['secondaryAction'];
    secondaryAction?: ListItemProps['secondaryAction'];
    actions?: ReactNode;
    CollapseProps?: CollapseProps;
    HeaderProps?: ListItemButtonProps;
    defaultExpanded?: boolean;
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
})

export function FormCard(props: FormCardProps) {
    const {
        className,
        sx,
        variant = 'outlined',
        error: hasError,
        isControl = false,
        disabled,
        bordered = true,
        icon,
        children,
        expandedActions,
        secondaryAction,
        actions,
        CollapseProps,
        HeaderProps,
        defaultExpanded = true
    } = props;
    const [isExpanded, setExpanded] = React.useState(defaultExpanded);
    const iconColor = hasError ? 'error' : undefined;
    const toggleExpand = () => setExpanded(!isExpanded);
    const hasChildren = Boolean(children);
    const hasActions = Boolean(secondaryAction) || Boolean(expandedActions);

    const expandIcon = isExpanded
        ? <KeyboardArrowDown color={iconColor} />
        : <KeyboardArrowRight color={iconColor} />;

    const title = props?.label ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {props.label}
        </Typography>
    ) : null;

    const formHelperText = props.helperText ? (
        <FormHelperText>
            {props.helperText}
        </FormHelperText>
    ) : null;

    const secondaryActions = hasActions && (
        <React.Fragment>
            {isExpanded ? expandedActions : null}
            {secondaryAction}
        </React.Fragment>
    );

    const hasHeader = title || secondaryActions;

    const expandListItemIcon = hasChildren && (
        <ListItemIcon>
            {icon || expandIcon}
        </ListItemIcon>
    )

    const header = hasHeader ? (
        <ListItem
            component="header"
            disablePadding
            secondaryAction={secondaryActions}
        >
            <ListItemButton
                dense={false}
                disabled={disabled}
                onClick={toggleExpand}
                {...HeaderProps}
            >
                {expandListItemIcon}
                <ListItemText
                    primary={title}
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
