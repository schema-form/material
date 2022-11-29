import React, {PropsWithChildren, ReactNode} from 'react';
import {
    CardActions,
    CardHeaderProps, CardProps,
    Collapse, CollapseProps,
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
        overflow: 'initial',
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
        secondaryAction,
        actions,
        CollapseProps,
        HeaderProps,
        defaultExpanded = true
    } = props;
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const iconColor = hasError ? 'error' : undefined;
    const toggleExpand = () => setExpanded(!expanded);

    const expandIcon = expanded
        ? <KeyboardArrowDown color={iconColor} />
        : <KeyboardArrowRight color={iconColor} />;

    const title = props?.label ? (
        <Typography
            component="span"
            variant="body2"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {props.label}
        </Typography>
    ) : null;

    const subheader = props.helperText ? (
        <Typography
            component="p"
            variant="caption"
            color={hasError ? 'error' : 'textSecondary'}
        >
            {props.helperText}
        </Typography>
    ) : null;

    const hasHeader = title || subheader || secondaryAction;
    const hasTitleAndSubheader = Boolean(title && subheader);

    const header = hasHeader ? (
        <ListItem
            component="header"
            disablePadding
            secondaryAction={secondaryAction}
        >
            <ListItemButton
                dense={false}
                disabled={disabled}
                onClick={toggleExpand}
                {...HeaderProps}
            >
                <ListItemIcon>
                    {icon || expandIcon}
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    secondary={subheader}
                    sx={{my: hasTitleAndSubheader ? 0 : undefined}}
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
        <Collapse in={expanded} timeout="auto" unmountOnExit {...CollapseProps}>
            {children}
            {footer}
        </Collapse>
    )

    return (
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
    )
}

export default FormCard;
