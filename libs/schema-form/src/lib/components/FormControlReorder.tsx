import {ReactNode} from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import {ButtonProps} from "@mui/material/Button";
import {BoxProps, Stack, styled, Tooltip} from "@mui/material";
import Reorder, {ReorderControlProps} from "./Reoder";

export type FormControlReorderProps = {
    className?: string;
    onRemove?: () => void;
    onMoveUp?: ReorderControlProps['onMoveUp'];
    onMoveDown?: ReorderControlProps['onMoveDown'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    sx?: BoxProps['sx'];
    control?: ReactNode;
}

const Content = styled('div')(({ theme }) => ({
    width: '100%'
}))

export function FormControlReorder(props: FormControlReorderProps) {
    const {
        className,
        onMoveDown,
        onMoveUp,
        onRemove,
        control,
        size,
        variant,
        color,
        sx
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
            {control}
        </Content>
    )

    return (
        <Stack
            direction="row"
            alignItems="start"
            className={className}
            sx={sx}
        >
            {reorder}
            {content}
            {removeButton}
        </Stack>
    )
}

export default FormControlReorder;
