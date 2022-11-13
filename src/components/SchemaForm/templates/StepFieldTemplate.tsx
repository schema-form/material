import React from 'react';
import {isObject} from "../utils/jsonSchema";
import ErrorList from "../components/ErrorList";
import {Button, ButtonGroup, Step, StepContent, StepLabel} from "@mui/material";
import {FieldTemplateProps} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {ConfigProvider, useConfig} from '../providers/ConfigProvider';

export function StepFieldTemplate(props: FieldTemplateProps<any, SchemaFormContext>) {
    const { children, schema, classNames, id, disabled, rawErrors } = props;
    const config = useConfig();
    const isObjectSchema = isObject(schema);
    const hasErrors = Boolean(rawErrors?.length);

    const errorList = hasErrors ? (
        <ErrorList
            className="field-error-list"
            errors={rawErrors as string[]}
        />
    ) : null;

    const navigation = (
        <ButtonGroup>
            <Button
                // disabled={activeStep === 0}
                // onClick={handleBack}
            >
                Back
            </Button>
            <Button
                variant="contained"
                color="primary"
                disabled={hasErrors}
                // onClick={handleNext}
            >
                {/*{activeStep === properties.length - 1 ? 'Finish' : 'Continue'}*/}
                Continue
            </Button>
        </ButtonGroup>
    )

    return (
        <ConfigProvider value={{
            ...config,
            isStepper: false,
            displayHeader: false
        }}>
            <Step
                index={1}
                key={id}
                className={classNames}
                disabled={disabled}
            >
                <StepLabel
                    optional={props.rawDescription}
                    children={props.label}
                    error={hasErrors}
                />
                <StepContent sx={{ pt: 2, pr: 0 }}>
                    {errorList}
                    {children}
                </StepContent>
            </Step>
        </ConfigProvider>
    );
}

export default StepFieldTemplate;
