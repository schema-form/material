import React from "react";
import Grid from "@mui/material/Grid";
import {
    ADDITIONAL_PROPERTY_FLAG,
    WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";
import FormControlReorder from "../components/FormControlReorder";
import {SchemaForm} from "../SchemaForm";
import {useConfig} from "../providers/ConfigProvider";

const WrapIfAdditionalTemplate = (props: WrapIfAdditionalTemplateProps) => {
    const {
      children,
      classNames,
      id,
      label,
      onDropPropertyClick,
      onKeyChange,
      readonly,
      schema,
    } = props;
    const isAdditional = ADDITIONAL_PROPERTY_FLAG in schema;
    const config = useConfig();
    const parentSchema = config?.props?.schema || {};
    const propertyNamesSchema = parentSchema?.propertyNames || {};

    if (!isAdditional) {
        return <div className={classNames}>{children}</div>;
    }

    const keyEditor = (
      <SchemaForm
        liveValidate={true}
        schema={{
          minLength: 1,
          title: 'Key',
          ...propertyNamesSchema,
          type: 'string',
        }}
        formData={label}
        disabled={readonly}
        onBlur={(id, newKeyLabel) => onKeyChange(newKeyLabel)}
      />
    );

    const propertyControls = (
      <Grid
        container
        key={`${id}-key`}
        alignItems="start"
        spacing={2}
      >
        <Grid item xs>
          {keyEditor}
        </Grid>
        <Grid item={true} xs>
          {children}
        </Grid>
      </Grid>
    );

    return (
      <FormControlReorder
        className={classNames}
        control={propertyControls}
        size="medium"
        variant="outlined"
        onRemove={onDropPropertyClick?.(label)}
      />
    );
};

export default WrapIfAdditionalTemplate;
