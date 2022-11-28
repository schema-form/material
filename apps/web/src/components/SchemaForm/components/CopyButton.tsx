import React, {useState} from "react";
import copyToClipboard from "copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import CheckIcon from "@mui/icons-material/Check";
import {IconButton, Tooltip, TooltipProps} from "@mui/material";
import {IconButtonProps} from "@mui/material/IconButton";

export type CopyButtonProps = IconButtonProps & {
    TooltipProps?: Omit<TooltipProps, 'children'>;
    copyContent: any;
    onCopied?: () => void;
};

export function CopyButton({
    onCopied,
    copyContent,
    TooltipProps,
    ...IconButtonProps
}: CopyButtonProps) {
    const hasContent = Boolean(copyContent);
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        const content = typeof copyContent === 'string'
            ? copyContent
            : JSON.stringify(copyContent);
        copyToClipboard(content);
        setPressed(true);
        setTimeout(() => setPressed(false), 360);
        onCopied?.();
    }

    const Icon = pressed
        ? CheckIcon
        : FileCopyIcon;

    return (
        <Tooltip
            title={pressed ? 'Copied' : 'Copy'}
            {...TooltipProps}
        >
            <IconButton
                size='small'
                {...IconButtonProps}
                disabled={!hasContent}
                onClick={handleClick}
            >
                <Icon fontSize={IconButtonProps.size || 'small'} />
            </IconButton>
        </Tooltip>
    );
}

export default CopyButton;
