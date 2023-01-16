import React from "react";
import {styled} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import {IconButtonProps} from "@mui/material/IconButton";

export type ExpandIconProps = SvgIconTypeMap['props'] & {
  edge?: IconButtonProps['edge'];
  isExpanded?: boolean;
  color?: string;
}

const ExpandRightIcon = styled(KeyboardArrowDown)<ExpandIconProps>(({ theme, edge = 'start', isExpanded }) => ({
  transition: `${theme.transitions.duration.short}ms`,
  transform: isExpanded
    ? (edge === 'start' ? 'rotate(0deg)' : 'rotate(0deg)')
    : (edge === 'start' ? 'rotate(-90deg)' : 'rotate(90deg)')
}));

export function ExpandIcon(props: ExpandIconProps) {
  return (
    <ExpandRightIcon {...props} />
  );
}

export default ExpandIcon;
