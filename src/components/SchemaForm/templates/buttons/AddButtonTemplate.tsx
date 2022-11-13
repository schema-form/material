import {IconButtonProps} from "@rjsf/utils";
import {Button, useTheme} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {SchemaFormContext} from "../../SchemaForm";

export function AddButtonTemplate(props: IconButtonProps<any, SchemaFormContext>) {
    const theme = useTheme();
    const themeProps = theme.components?.MuiButton?.defaultProps;
    return (
        <Button
            variant={themeProps?.variant}
            color={themeProps?.color}
            size={themeProps?.size}
            className={props.className}
            disabled={props.disabled}
            startIcon={<AddIcon />}
            onClick={props.onClick}
        >
            {props.children || 'New'}
        </Button>
    );
}

export default AddButtonTemplate;
