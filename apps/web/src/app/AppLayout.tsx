import React from 'react';
import {startTransition, useEffect, useState} from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tabs, {TabsProps} from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import {SchemaForm, SchemaFormProps} from "@project/mui-schema-form";
import AppNavigation from "./AppNavigation";
import {useAppRoute} from "./AppRoutesProvider";
import {EditorFormData} from "./EditorForm";
import Layout from "../components/Layout/Layout";
import IconButton from "@mui/material/IconButton";
import GitHub from "@mui/icons-material/GitHub";
import MUI from "../icons/MUI";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import PropsEditor from "./PropsEditor";
import {Markdown} from "@project/mui-schema-form";
import {DEFAULT_APP_ROUTE_PATH} from "../constants/routes";

enum AppLayoutTab {
    DEMO = 'DEMO',
    DOCS = 'DOCS',
    PROPS = 'PROPS'
}

type MarkdownLoaderProps = { url: string };

function MarkdownLoader({ url }: MarkdownLoaderProps) {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(url)
            .then(response => response.text())
            .then(setContent);
    }, []);

    return (
        <Markdown>
            {content}
        </Markdown>
    );
}

export default function AppLayout() {
    const appRoute = useAppRoute();
    const navigate = useNavigate();
    const hasDemoTab = Boolean(appRoute?.fetchSchema);
    const hasDocsTab = Boolean(appRoute?.docsURL);
    const hasPropsTab = Boolean(appRoute?.fetchProps);
    const hasRouteContent = hasDemoTab || hasDocsTab || hasPropsTab;
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
    const [activeTab, setActiveTab] = useState<AppLayoutTab | undefined>(AppLayoutTab.DEMO);
    const handleChange: TabsProps['onChange'] = (event, newActiveTab) => setActiveTab(newActiveTab);

    if (!hasRouteContent) {
        navigate(DEFAULT_APP_ROUTE_PATH);
    }

    useEffect(() => {
        const newActiveTab =
            hasDemoTab ? AppLayoutTab.DEMO :
                hasDocsTab ? AppLayoutTab.DOCS :
                    hasPropsTab ? AppLayoutTab.PROPS : undefined;

        if (newActiveTab !== activeTab) {
            setActiveTab(newActiveTab);
        }
    }, [appRoute?.pathname]);

    useEffect(() => {
        if (hasDemoTab) {
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
        }
    }, [appRoute?.pathname]);

    const propsEditor = hasDemoTab && (
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

    const renderDemoTabContent = () => {
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

        return (
            <Container maxWidth="xl" sx={{py: 2}}>
                {form}
            </Container>
        );
    }

    const renderDocsTabContent = () => {
        const markdown = appRoute?.docsURL ? (
            <MarkdownLoader
                key={appRoute?.docsURL}
                url={appRoute?.docsURL}
            />
        ) : null;

        return (
            <Container maxWidth="xl" sx={{py: 2}}>
                {markdown}
            </Container>
        );
    }

    const renderPropsTabContent = () => (
        <Container maxWidth="xl" sx={{py: 2}}>
            Props
        </Container>
    )

    const renderTabContent = (activeTab?: AppLayoutTab) => {
        switch (activeTab) {
            case AppLayoutTab.DEMO: return renderDemoTabContent();
            case AppLayoutTab.DOCS: return renderDocsTabContent();
            case AppLayoutTab.PROPS: return renderPropsTabContent();
            default: return null;
        }
    }

    const demoTab = hasDemoTab && (
        <Tab
            label="Demo"
            value={AppLayoutTab.DEMO}
        />
    );

    const docsTab = hasDocsTab && (
        <Tab
            label="Docs"
            value={AppLayoutTab.DOCS}
        />
    );

    const propsTab = hasPropsTab && (
        <Tab
            label="Props"
            value={AppLayoutTab.PROPS}
        />
    );

    const tabs = (
        <Tabs value={activeTab} onChange={handleChange}>
            {demoTab}
            {docsTab}
            {propsTab}
        </Tabs>
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
            {tabs}
            <Divider />
            {renderTabContent(activeTab)}
        </Layout>
    )
}
