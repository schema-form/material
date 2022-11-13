import * as React from 'react';
import {startTransition, useEffect, useState} from "react";
import {Container, Link, Stack, useMediaQuery, useTheme} from "@mui/material";
import {SchemaForm, SchemaFormProps} from "../components/SchemaForm";
import AppNavigation from "./AppNavigation";
import {useAppRoute} from "./AppRoutesProvider";
import EditorForm, {EditorFormData} from "./EditorForm";
import Layout from "../components/Layout/Layout";
import IconButton from "@mui/material/IconButton";
import {GitHub} from "@mui/icons-material";
import MUI from "../icons/MUI";
import Typography from "@mui/material/Typography";

export default function AppLayout() {
    const appRoute = useAppRoute();
    const formKey = appRoute.pathname;
    const [editorData, setEditorData] = useState<EditorFormData>({
        schema: '',
        uiSchema: '',
        formData: ''
    });
    const [formData, setFormData] = useState<unknown>();
    const [schema, setSchema] = useState<SchemaFormProps['schema']>();
    const theme = useTheme();
    const isBreakpointUpSM = useMediaQuery(theme.breakpoints.up('sm'));

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
    }, [appRoute.pathname]);

    const form = schema && (
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
    );

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

    const gitHubLink = (
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
    )

    const appLogo = (
        <Stack direction="row" spacing={2} alignItems="center">
            <Link href="#" color="inherit" sx={{display: 'inline-flex'}}>
                <MUI fontSize="medium" />
            </Link>
            <Typography variant="body1" textTransform="uppercase" fontWeight="bold">
                Form
            </Typography>
        </Stack>
    )

    return (
        <Layout
            drawer={<AppNavigation />}
            rightDrawer={sourceForm}
            AppBarProps={{
                logo: appLogo,
                actions: [gitHubLink]
            }}
        >
            <Container maxWidth="xl" sx={{py: 3}}>
                {form}
            </Container>
        </Layout>
    )
}
