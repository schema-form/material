import React, {useState} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {exampleSourceCode} from "../constants/exampleSourceCode";
import {EditorForm, EditorFormProps} from "./EditorForm";
import {Markdown, DownloadIconButton} from "@schema-form/material";
import Toolbar from "@mui/material/Toolbar";
import CodeOffOutlined from "@mui/icons-material/CodeOffOutlined";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import RestartAltOutlined from "@mui/icons-material/RestartAltOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export type PropsEditorProps = EditorFormProps;

export function PropsEditor(props: PropsEditorProps) {
    const [showSource, setShowSource] = useState(false);
    const toggleSource = () => setShowSource(!showSource);

    const resetButton = (
        <Tooltip title="Reset">
            <IconButton size="small" edge="end">
                <RestartAltOutlined fontSize="small" />
            </IconButton>
        </Tooltip>
    );

    const downloadSchemaButton = (
        <DownloadIconButton
            size="small"
            file={{
                content: props.formData?.schema,
                mimeType: 'application/json',
                name: 'example.schema.json'
            }}
            TooltipProps={{title: 'Download schema'}}
        />
    );

    const CodeIcon = showSource ? CodeOffOutlined : CodeOutlined;
    const showCodeButton = (
        <Tooltip title={showSource ? 'Hide code' : 'Show code'}>
            <IconButton size="small" edge="start" onClick={toggleSource}>
                <CodeIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );

    const toolbar = (
        <Toolbar variant="dense">
            <Typography variant="overline">
                Props Editor
            </Typography>
            <Stack direction="row" spacing={.5} sx={{ml: 'auto'}}>
                {showCodeButton}
                {downloadSchemaButton}
                {resetButton}
            </Stack>
        </Toolbar>
    );

    return (
        <React.Fragment>
            {toolbar}
            <Divider />
            <Collapse in={!showSource}>
                <Box sx={{p: 2}}>
                    <EditorForm {...props} />
                </Box>
            </Collapse>
            <Collapse in={showSource}>
                <Markdown>
                    {`~~~${exampleSourceCode}~~~`}
                </Markdown>
            </Collapse>
        </React.Fragment>
    )
}

export default PropsEditor;
