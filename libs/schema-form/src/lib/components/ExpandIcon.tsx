import React from "react";
import {styled} from "@mui/material";
import {KeyboardArrowRight} from "@mui/icons-material";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";

export type ExpandIconProps = SvgIconTypeMap['props'] & {
  isExpanded?: boolean;
  color?: string;
}

const ExpandRightIcon = styled(KeyboardArrowRight)<ExpandIconProps>(({ theme, isExpanded }) => ({
  transition: `${theme.transitions.duration.short}ms`,
  transform: isExpanded ? 'rotate(0deg)' : 'rotate(90deg)'
}));

export function ExpandIcon(props: ExpandIconProps) {
  return (
    <ExpandRightIcon {...props} />
  );
}

export default ExpandIcon;
