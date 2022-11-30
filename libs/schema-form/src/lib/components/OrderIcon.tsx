import {Avatar, AvatarProps, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

export type OrderIconProps = {
    variant?: AvatarProps['variant'];
    order: number;
    error?: boolean;
}

export function OrderIcon(props: OrderIconProps) {
    const theme = useTheme();
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
