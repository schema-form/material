import * as React from 'react';
import {startTransition, useEffect, useState} from "react";
import {Container, Link, Stack, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import {SchemaForm, SchemaFormProps} from "../components/SchemaForm";
import AppNavigation from "./AppNavigation";
import {useAppRoute} from "./AppRoutesProvider";
import {EditorFormData} from "./EditorForm";
import Layout from "../components/Layout/Layout";
import IconButton from "@mui/material/IconButton";
import {GitHub} from "@mui/icons-material";
import MUI from "../icons/MUI";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {DEFAULT_APP_ROUTE_PATH} from "../constants/routes";
import PropsEditor from "./PropsEditor";

export default function AppLayout() {
    const appRoute = useAppRoute();
    const navigate = useNavigate();
    const hasRouteSchema = Boolean(appRoute?.fetchSchema);
    const [formKey, setFormKey] = useState<string>('-');
    const [editorData, setEditorData] = useState<EditorFormData>({
        schema: '',
        uiSchema: '',
        formData: ''
    });
    const [formData, setFormData] = useState<unknown>();
    const [schema, setSchema] = useState<SchemaFormProps['schema']>();
    const [uiSchema, setUiSchema] = useState<SchemaFormProps['uiSchema']>();
    const theme = useTheme();
    const isBreakpointUpSM = useMediaQuery(theme.breakpoints.up('sm'));

    if (!hasRouteSchema) {
        navigate(DEFAULT_APP_ROUTE_PATH);
    }

    useEffect(() => {
        const fetchSchemas = async () => {
            const schemaResponse = await appRoute?.fetchSchema?.();
            const uiSchemaResponse = await appRoute?.fetchUiSchema?.();
            const schema = schemaResponse?.default;
            const uiSchema = uiSchemaResponse?.default;
            const formData = schema?.default;

            setSchema(schema);
            setUiSchema(uiSchema);
            setFormData(formData);
            setFormKey(appRoute?.pathname as string);
            setEditorData({
                schema: JSON.stringify(schema, null, 2),
                uiSchema: JSON.stringify(uiSchema, null, 2),
                formData: JSON.stringify(formData, null, 2)
            });
        }

        fetchSchemas()
            .catch(console.error);
    }, [appRoute?.pathname]);

    const form = schema ? (
        <SchemaForm
            key={formKey}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={({ formData }) => {
                setFormData(formData);
                startTransition(() => {
                    setEditorData({
                        ...editorData,
                        formData: JSON.stringify(formData, null , 2)
                    });
                })
            }}
        />
    ) : null;

    const propsEditor = (
        <PropsEditor
            key={formKey}
            formData={editorData}
            onChange={({ formData }) => {
                setEditorData(formData);
                startTransition(() => {
                    try {
                        const hasSchema = Boolean(formData?.schema);
                        const hasUiSchema = Boolean(formData?.uiSchema);
                        const hasFormData = Boolean(formData?.formData);
                        const newSchema = hasSchema
                            ? JSON.parse(formData?.schema)
                            : undefined;
                        const newUiSchema = hasUiSchema
                            ? JSON.parse(formData?.uiSchema)
                            : undefined;
                        const newFormData = hasFormData
                            ? JSON.parse(formData?.formData)
                            : undefined;

                        setSchema(newSchema);
                        setUiSchema(newUiSchema);
                        setFormData(newFormData);
                    } catch (e) {
                        console.error(e);
                    }
                });
            }}
        />
    );

    const GitHubLink = (
        <Tooltip title="GitHub">
            <IconButton
                edge="end"
                color="inherit"
                component={Link}
                target="_blank"
                href="https://github.com/slavabelaev/mui-form"
                sx={{p: isBreakpointUpSM ? .5 : undefined}}
            >
                <GitHub sx={{fontSize: 28}} />
            </IconButton>
        </Tooltip>
    );

    const appLogo = (
        <Stack
            component={RouterLink}
            to="/"
            direction="row"
            spacing={2}
            alignItems="center"
            color="inherit"
            sx={{textDecoration: 'none'}}
        >
            <MUI fontSize="medium" />
            <Typography variant="body1" textTransform="uppercase" fontWeight="bold">
                Schema Form
            </Typography>
        </Stack>
    );

    return (
        <Layout
            drawer={<AppNavigation />}
            rightDrawer={propsEditor}
            AppBarProps={{
                logo: appLogo,
                actions: GitHubLink
            }}
        >
            <Container maxWidth="xl" sx={{py: 3}}>
                {form}
            </Container>
        </Layout>
    )
}
