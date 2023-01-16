import React from "react";
import {styled} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import {IconButtonProps} from "@mui/material/IconButton";

export type AnimatedExpandIconProps = SvgIconTypeMap['props'] & {
  edge?: IconButtonProps['edge'];
  isExpanded?: boolean;
  color?: string;
}

export const AnimatedExpandIcon = styled(KeyboardArrowDown)<AnimatedExpandIconProps>(({ theme, edge = 'start', isExpanded }) => ({
  transition: `${theme.transitions.duration.short}ms`,
  transform: isExpanded
    ? 'rotate(-180deg)'
    : 'rotate(0deg)'
}));

export default AnimatedExpandIcon;
