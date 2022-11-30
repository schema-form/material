import Form, {FormProps} from '@rjsf/core';
import validator from "@rjsf/validator-ajv8";

export type ExampleFormProps = Partial<FormProps>;

export function ExampleForm(props: ExampleFormProps) {
  return (
    <Form
      validator={validator}
      liveValidate={true}
      schema={{
        properties: {
          firstName: {
            title: 'First Name',
            type: 'string',
            minLength: 3
          },
          lastName: {
            title: 'Last Name',
            type: 'string',
            minLength: 3
          }
        }
      }}
      {...props}
    />
  );
}

export default ExampleForm;
