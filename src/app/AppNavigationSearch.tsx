import * as React from "react";
import {styled} from "@mui/material";
import ClearOutlined from "@mui/icons-material/ClearOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import InputBase, {InputBaseProps} from "@mui/material/InputBase";

const SearchInput = styled(InputBase)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}))

export function AppNavigationSearch(props: InputBaseProps) {
    const hasValue = Boolean(props?.value);

    const searchIcon = !hasValue && (
        <SearchOutlined
            fontSize="small"
            color="action"
        />
    );

    const clearButton = hasValue && (
        <IconButton
            edge="end"
            size="small"
            onClick={() => {
                const changeEvent = { target: { value: '' } };
                props.onChange?.(changeEvent as any);
            }}
        >
            <ClearOutlined fontSize="small" />
        </IconButton>
    );

    return (
        <Toolbar variant="dense">
            <SearchInput
                placeholder="Search"
                {...props}
                endAdornment={clearButton || searchIcon}
            />
        </Toolbar>
    )
}
