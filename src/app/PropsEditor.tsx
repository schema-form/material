import React, {useState} from "react";
import {Box, Collapse, Divider, Stack, Tooltip} from "@mui/material";
import {exampleSourceCode} from "../constants/exampleSourceCode";
import {EditorForm, EditorFormProps} from "./EditorForm";
import {Markdown} from "../components/SchemaForm/components/Markdown";
import Toolbar from "@mui/material/Toolbar";
import {CodeOffOutlined, CodeOutlined, DownloadOutlined, RestartAltOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DownloadIconButton from "../components/SchemaForm/components/DownloadIconButton";

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
