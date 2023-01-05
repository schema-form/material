import {findSchemaDefinition, RJSFValidationError} from "@rjsf/utils";
import template from "lodash/template";
import {FormProps} from "@rjsf/core";

const findSchemaMessage = (schema: any, error: RJSFValidationError) => {
  const message = schema?.['x-errorMessage'];
  const errorName = error?.name as string;
  const messageTemplate = message?.[errorName] || message;

  return (typeof messageTemplate === "string")
    ? template(messageTemplate)(error?.params)
    : undefined;
};

export function mapSchemaErrors(errors: RJSFValidationError[], rootSchema: FormProps['schema']) {
  return errors?.map((error) => {
    const schemaRef = error.schemaPath?.split('/').slice(0, -1).join('/');
    const schema = findSchemaDefinition(schemaRef, rootSchema);
    const schemaMessage = findSchemaMessage(schema, error);

    return {
      ...error,
      message: schemaMessage || error.message,
    }
  });
}

export default mapSchemaErrors;
