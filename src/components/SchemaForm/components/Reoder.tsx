import React from 'react';
import Button from "@mui/material/Button";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {ButtonGroup, ButtonProps, ButtonGroupProps, Tooltip, styled} from "@mui/material";

export type ReorderControlProps = {
    className?: string;
    orientation?: ButtonGroupProps['orientation'];
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    ButtonGroupProps?: ButtonGroupProps;
    ButtonProps?: ButtonProps;
    sx?: ButtonGroupProps['sx'];
}

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: 'auto !important',
    padding: 0,
}))

export function Reorder(props: ReorderControlProps) {
    const {
        className,
        sx,
        orientation,
        onMoveDown,
        onMoveUp,
        ButtonGroupProps,
        ButtonProps
    } = props;
    const isVertical = orientation === 'vertical';

    return (
        <ButtonGroup
            className={className}
            orientation={orientation}
            sx={sx}
            {...ButtonGroupProps}
        >
            <Tooltip title='Move Up' placement={isVertical ? 'top' : undefined}>
                <StyledButton
                    size="small"
                    {...ButtonProps}
                    onClick={onMoveUp}
                    disabled={!onMoveUp}
                >
                    <KeyboardArrowUp fontSize="small" />
                </StyledButton>
            </Tooltip>
            <Tooltip title='Move Down'>
                <StyledButton
                    size="small"
                    {...ButtonProps}
                    onClick={onMoveDown}
                    disabled={!onMoveDown}
                >
                    <KeyboardArrowDown fontSize="small" />
                </StyledButton>
            </Tooltip>
        </ButtonGroup>
    )
}

export default Reorder;
