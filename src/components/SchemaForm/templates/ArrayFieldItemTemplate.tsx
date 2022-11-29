import {ArrayFieldTemplateItemType} from "@rjsf/utils";
import Typography from "@mui/material/Typography";
import {isEmpty} from "lodash";
import {isGroup} from "../utils/jsonSchema";
import FormCard from "../components/FormCard";
import FormReorder from "../components/FormReorder";
import {ConfigProvider, useConfig} from "../providers/ConfigProvider";
import OrderIcon from "../components/OrderIcon";
import {Box, CardContent, Divider, styled, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Reorder from "../components/Reoder";
import React from "react";

const HeaderActions = styled('div')(({ theme }) => ({
    display: 'grid',
    flexWrap: 'nowrap',
    gridTemplateColumns: 'auto auto auto',
    alignItems: 'center'
}))

export function ArrayFieldCardItemTemplate(props: ArrayFieldTemplateItemType) {
    const { key, index, children, className } = props;
    const config = useConfig();
    const orderNumber = index + 1;
    const { schema } = children?.props || {};
    const { __errors } = children?.props?.errorSchema || {};
    const error = __errors?.[0];
    const hasError = Boolean(error);
    const onRemove = props.hasRemove
        ? props.onDropIndexClick(index)
        : undefined;
    const onMoveUp = props.hasMoveUp
        ? props.onReorderClick(index, index - 1)
        : undefined;
    const onMoveDown = props.hasMoveDown
        ? props.onReorderClick(index, index + 1)
        : undefined;

    const removeButton = onRemove ? (
        <Tooltip title='Delete' placement="left">
            <IconButton
                sx={{ml: 1}}
                size="small"
                edge="end"
                color="error"
                onClick={onRemove}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    ) : null;

    const hasReorder = onMoveDown || onMoveUp;
    const reorder = hasReorder ? (
        <Reorder
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            orientation="horizontal"
            ButtonGroupProps={{
                color: hasError ? 'error' : undefined
            }}
        />
    ) : null;

    const headerActions = (removeButton || reorder) ? (
        <HeaderActions>
            {reorder}
            {removeButton}
        </HeaderActions>
    ) : null;

    const orderIcon = (
        <OrderIcon
            order={orderNumber}
            error={hasError}
        />
    )

    return (
        <>
            <Divider />
            <FormCard
                key={key}
                className={className}
                error={hasError}
                bordered={false}
                icon={orderIcon}
                title={schema?.title}
                subheader={error || schema?.description}
                secondaryAction={headerActions}
            >
                <ConfigProvider value={{
                    ...config,
                    displayHeader: false,
                    displayErrorList: false
                }}>
                    <CardContent>
                        {children}
                    </CardContent>
                </ConfigProvider>
            </FormCard>
        </>
    );
}

function ArrayFieldControlItemTemplate(props: ArrayFieldTemplateItemType) {
    const { key, index, children, className } = props;
    const { __errors } = children?.props?.errorSchema || {};
    const error = __errors?.[0];
    const hasError = Boolean(error);
    const onRemove = props.hasRemove
        ? props.onDropIndexClick(index)
        : undefined;
    const onMoveUp = props.hasMoveUp
        ? props.onReorderClick(index, index - 1)
        : undefined;
    const onMoveDown = props.hasMoveDown
        ? props.onReorderClick(index, index + 1)
        : undefined;

    return (
        <Box sx={{m: 2}}>
            <FormReorder
                key={key}
                className={className}
                onRemove={onRemove}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                size="small"
                variant="outlined"
                color={hasError ? 'error' : undefined}
            >
                {children}
            </FormReorder>
        </Box>
    )
}

export function ArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
    const childrenSchema = props?.children?.props?.schema || {};
    const isGroupSchema = isGroup(childrenSchema);

    return isGroupSchema
        ? ArrayFieldCardItemTemplate(props)
        : ArrayFieldControlItemTemplate(props);
}

export default ArrayFieldItemTemplate;
