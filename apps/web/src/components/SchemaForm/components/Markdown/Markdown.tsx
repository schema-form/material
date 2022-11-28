import React from "react";
import ReactMarkdown, { Options } from "react-markdown";
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import {CodeThemeProvider} from "./components/Code";
import components from "./components";
import {styled} from "@mui/material";

export type MarkdownProps = Options;

const StyledMarkdown = styled(ReactMarkdown)<Options>(({ theme }) => ({
  '& > *:first-child': {
    marginTop: 0
  },
  '& > *:last-child': {
    marginBottom: 0
  }
}))

export function Markdown(props: MarkdownProps) {
    return (
        <CodeThemeProvider>
          <StyledMarkdown
            unwrapDisallowed={true}
            linkTarget="_blank"
            {...props}
            components={{
              ...components,
              ...props.components
            }}
            remarkPlugins={[slug, gfm]}
          >
              {props.children}
          </StyledMarkdown>
        </CodeThemeProvider>
    );
}

export default Markdown;
