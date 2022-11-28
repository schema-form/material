import React from "react";
import SyntaxHighlighter, {SyntaxHighlighterProps} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyButton from "../../../CopyButton";
import {useCodeTheme} from "./CodeThemeProvider";
import {CodeThemeToggle} from "./CodeThemeToggle";
import {styled} from "@mui/material";
import {CodeProps} from "react-markdown/lib/ast-to-react";

type StyledProps = {
    isDarkTheme: boolean
};

const Root = styled('div')<StyledProps>(({ theme, isDarkTheme }) => ({
    position: 'relative',
    padding: 0,
    margin: 0,
    background: isDarkTheme
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    '& > pre': {
        margin: 0,
        padding: theme.spacing(2) + `!important`,
        background: 'none!important'
    }
}))

const Actions = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'inherit',
    padding: theme.spacing(1),
    opacity: .8,
    borderRadius: theme.shape.borderRadius,
}))

const StyledCopyIconButton = styled(CopyButton)<StyledProps>(({ theme, isDarkTheme }) => ({
    color: isDarkTheme
        ? theme.palette.common.white
        : theme.palette.common.black
}))

const InlineCode = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  background: theme.palette.grey.A200,
  borderRadius: theme.shape.borderRadius,
  '& > pre': {
    padding: theme.spacing(0, 1) + '!important',
    margin: 0,
  }
}))

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)<SyntaxHighlighterProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: 15
}))

export function Code(props: CodeProps) {
    const { theme = 'dark' } = useCodeTheme();
    const isDarkTheme = theme === 'dark';
    const style = isDarkTheme ? dark : undefined;
    const { className, inline, children } = props;
    const language = className?.replace(/language-/, '');
    const source = (children?.[0] as string)?.trim?.() || children?.[0];

    const syntaxHighlighter = (
      <StyledSyntaxHighlighter
        language={language}
        style={style}
        children={source as string}
      />
    )

    if (inline) {
      return (
        <InlineCode {...props}>
          {syntaxHighlighter}
        </InlineCode>
      );
    }

    const copyButton = (
        <StyledCopyIconButton
            copyContent={source}
            isDarkTheme={isDarkTheme}
        />
    );

    const actions = (
        <Actions>
            <CodeThemeToggle />
            {copyButton}
        </Actions>
    )

    return (
        <Root isDarkTheme={isDarkTheme}>
            {actions}
            {syntaxHighlighter}
        </Root>
    )
}

export default Code;
