import React, {PropsWithChildren, ReactNode} from 'react';
import {
    CardActions,
    CardHeaderProps, CardProps,
    Collapse,
    ListItem,
    ListItemButton, ListItemIcon, ListItemProps,
    ListItemText, styled,
} from "@mui/material";
import {ExpandMoreOutlined, ExpandLessOutlined, ErrorOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export type FormCardProps = PropsWithChildren<{
    variant?: CardProps['variant'];
    className?: string;
    bordered?: boolean;
    sx?: CardProps['sx'];
    error?: boolean;
    disabled?: boolean;
    focused?: boolean;
    icon?: ReactNode;
    title?: CardHeaderProps['title'];
    subheader?: CardHeaderProps['subheader'];
    secondaryAction?: ListItemProps['secondaryAction'];
    actions?: ReactNode;
}>

export type RootProps = CardProps & {
    error?: FormCardProps['error'];
    bordered?: FormCardProps['bordered'];
    focused?: FormCardProps['focused'];
}

export const StyledCard = styled(Card)<RootProps>(({ theme, error, bordered, focused }) => {
    const focusedStyles = focused ? {
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

export function FormCard({
    className,
    sx,
    variant = 'outlined',
    error: hasError,
    focused = false,
    disabled,
    bordered = true,
    icon,
    title,
    subheader,
    children,
    secondaryAction,
    actions
}: FormCardProps) {
    const [expanded, setExpanded] = React.useState(true);
    const toggleExpand = () => setExpanded(!expanded);

    const errorIcon = hasError && (
        <ErrorOutlined color="error" />
    );

    const expandIcon = expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />;
    const header = (title || subheader || secondaryAction) && (
        <ListItem
            component="header"
            disablePadding
            secondaryAction={secondaryAction}
            disabled={disabled}
        >
            <ListItemButton
                dense={false}
                disabled={disabled}
                onClick={toggleExpand}
            >
                <ListItemIcon>
                    {icon || errorIcon || expandIcon}
                </ListItemIcon>
                <ListItemText
                    primary={(
                        <Typography
                            component="span"
                            variant="body1"
                            color={hasError ? 'error' : 'textPrimary'}
                        >
                            {title}
                        </Typography>
                    )}
                    secondary={(
                        <Typography
                            component="p"
                            variant="caption"
                            color={hasError ? 'error' : 'textSecondary'}
                        >
                            {subheader}
                        </Typography>
                    )}
                />
            </ListItemButton>
        </ListItem>
    )

    const footer = actions && (
        <CardActions>
            {actions}
        </CardActions>
    )

    const collapse = (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            {children}
            {footer}
        </Collapse>
    )

    return (
        <StyledCard
            bordered={bordered}
            focused={focused}
            error={hasError}
            variant={variant}
            className={className}
            sx={sx}
        >
            {header}
            {collapse}
        </StyledCard>
    )
}

export default FormCard;
