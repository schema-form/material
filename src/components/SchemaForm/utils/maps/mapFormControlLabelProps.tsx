import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {FormControlLabelProps, FormHelperText, styled} from "@mui/material";
import {SchemaFormContext} from "../../SchemaForm";
import Typography from "@mui/material/Typography";
import {mapFormHelperTextProps} from "./mapFormHelperTextProps";

const CheckboxHelperText = styled(FormHelperText)(({ theme }) => ({
    padding: 0,
    margin: 0,
    '& > div > p': theme.typography.caption
}))

export function mapFormControlLabelProps(props: WidgetProps<any, SchemaFormContext>): FormControlLabelProps {
    const formHelperTextProps = mapFormHelperTextProps(props);

    const label = (
        <div>
            <Typography variant="subtitle1">{props.label}</Typography>
            <CheckboxHelperText {...formHelperTextProps} />
        </div>
    );

    return {
        label,
        control: <></>,
    }
}
