import React, {PropsWithChildren} from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import {ButtonProps} from "@mui/material/Button";
import {styled, Tooltip} from "@mui/material";
import Reorder, {ReorderControlProps} from "./Reoder";

export type FormReorderProps = PropsWithChildren<{
    className?: string;
    onRemove?: () => void;
    onMoveUp?: ReorderControlProps['onMoveUp'];
    onMoveDown?: ReorderControlProps['onMoveDown'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
}>

const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    listStyle: 'none',
    padding: 0,
    margin: 0
}))

const Content = styled('div')(({ theme }) => ({
    width: '100%'
}))

export function FormReorder(props: FormReorderProps) {
    const {
        className,
        onMoveDown,
        onMoveUp,
        onRemove,
        children,
        size,
        variant,
        color
    } = props;
    const iconButtonSize = ['small', 'medium'].includes(size as string) ? size : 'medium';
    const hasReorder = onMoveDown || onMoveUp;

    const reorder = hasReorder ? (
        <Reorder
            orientation="vertical"
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            ButtonProps={{
                variant,
                size,
                color
            }}
            sx={{mr: 1}}
        />
    ) : null;

    const removeButton = onRemove ? (
        <Tooltip title='Delete'>
            <IconButton
                edge="end"
                color="error"
                onClick={onRemove}
                size={iconButtonSize}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    ) : null;

    const content = (
        <Content>
            {children}
        </Content>
    )

    return (
        <Root className={className}>
            {reorder}
            {content}
            {removeButton}
        </Root>
    )
}

export default FormReorder;
