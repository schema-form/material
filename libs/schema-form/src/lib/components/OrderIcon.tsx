import {Avatar, AvatarProps, Badge, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

export type OrderIconProps = {
    variant?: AvatarProps['variant'];
    order: number;
    error?: boolean;
}

export function OrderIcon(props: OrderIconProps) {
    const theme = useTheme();

    return (
      <Badge
        variant="standard"
        color={props?.error ? 'error' : 'primary'}
        badgeContent={props.order}
        sx={{
          '& > .MuiBadge-badge': {
            position: 'static',
            transform: 'none'
          }
        }}
      />
    );

    return (
        <Avatar
            variant={props.variant}
            sx={{
                width: 24,
                height: 24,
                backgroundColor: props.error
                    ? theme.palette.error.main
                    : theme.palette.primary.main
            }}
        >
            <Typography variant="caption" fontWeight="bold">
                {props.order}
            </Typography>
        </Avatar>
    );
}

export default OrderIcon;
