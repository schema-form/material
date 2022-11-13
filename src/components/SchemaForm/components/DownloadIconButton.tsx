import React from 'react';
import {Tooltip, TooltipProps} from "@mui/material";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/GetAppOutlined";
import {download} from "../utils/download";

export type DownloadIconButtonProps = IconButtonProps & {
    file: {
        name?: string;
        content: string;
        mimeType?: string;
    }
    onDownload?: () => void;
    TooltipProps?: Omit<TooltipProps, 'title' | 'children'> & {
        title?: TooltipProps['title'];
    };
}

export function DownloadIconButton({
    file,
    onDownload,
    TooltipProps,
    ...IconButtonProps
}: DownloadIconButtonProps) {
    const hasContent = Boolean(file?.content);

    const handleDownload = () => {
        download(file.content, file.name, file.mimeType);
        onDownload?.();
    };

    return (
        <Tooltip
            title='Download'
            {...TooltipProps}
        >
            <IconButton
                {...IconButtonProps}
                disabled={!hasContent}
                onClick={handleDownload}
            >
                <DownloadIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DownloadIconButton;
