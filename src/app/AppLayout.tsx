import * as React from 'react';
import {startTransition, useEffect, useState} from "react";
import {Container, Link, Stack, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import {SchemaForm, SchemaFormProps} from "../components/SchemaForm";
import AppNavigation from "./AppNavigation";
import {useAppRoute} from "./AppRoutesProvider";
import EditorForm, {EditorFormData} from "./EditorForm";
import Layout from "../components/Layout/Layout";
import IconButton from "@mui/material/IconButton";
import {GitHub} from "@mui/icons-material";
import MUI from "../icons/MUI";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {DEFAULT_APP_ROUTE_PATH} from "../constants/routes";
import JSONSchema from "../icons/JSONSchema";

export default function AppLayout() {
    const appRoute = useAppRoute();
    const navigate = useNavigate();
    const hasRouteSchema = Boolean(appRoute?.fetchSchema);
    const formKey = appRoute?.pathname;
    const [editorData, setEditorData] = useState<EditorFormData>({
        schema: '',
        uiSchema: '',
        formData: ''
    });
    const [formData, setFormData] = useState<unknown>();
    const [schema, setSchema] = useState<SchemaFormProps['schema']>();
    const theme = useTheme();
    const isBreakpointUpSM = useMediaQuery(theme.breakpoints.up('sm'));

    console.log('!appRoute', appRoute);
    if (!hasRouteSchema) {
        navigate(DEFAULT_APP_ROUTE_PATH);
    }

    useEffect(() => {
        appRoute?.fetchSchema?.().then((data) => {
            try {
                const schema = data?.default;
                const formData = schema?.default;

                setSchema(schema);
                setFormData(formData);
                setEditorData({
                    schema: JSON.stringify(schema, null, 2),
                    formData: JSON.stringify(formData, null, 2)
                })
            } catch (e) {
                console.error(e);
            }
        })
    }, [appRoute?.pathname]);

    const form = schema ? (
        <SchemaForm
            key={formKey}
            schema={schema}
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

    const sourceForm = (
        <Container maxWidth="xl" sx={{py: 3}}>
            <EditorForm
                key={formKey}
                formData={editorData}
                onChange={({ formData }) => {
                    setEditorData(formData);
                    startTransition(() => {
                        try {
                            const newFormData = JSON.parse(formData?.formData);
                            const newSchema = JSON.parse(formData?.schema);
                            setSchema(newSchema);
                            setFormData(newFormData);
                        } catch (e) {
                            console.error(e);
                        }
                    });
                }}
            />
        </Container>
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
                JSON Schema Form
            </Typography>
        </Stack>
    );

    return (
        <Layout
            drawer={<AppNavigation />}
            rightDrawer={sourceForm}
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
