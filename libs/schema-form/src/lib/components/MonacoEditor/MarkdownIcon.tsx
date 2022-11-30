import {SvgIcon, SvgIconProps} from "@mui/material";

export function MarkdownIcon(props: SvgIconProps) {
    return (
        <SvgIcon viewBox="0 0 208 128" {...props}>
            <rect width="198" height="118" x="5" y="5" ry="10" stroke="#000" stroke-width="10" fill="none"/>
            <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/>
        </SvgIcon>
    )
}

export default MarkdownIcon;
