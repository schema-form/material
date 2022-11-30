import { Options } from "react-markdown";
import {
  Divider, DividerProps,
  Link,
  styled,
  Table,
  TableBody,
  TableCell, TableCellProps,
  TableFooter,
  TableHead,
  TableProps,
  TableRow
} from "@mui/material";
import Code from "./Code";
import Input from "./Input";

const Heading1 = styled('h1')(({ theme }) => ({
  fontSize: theme.spacing(4),
  fontWeight: 400,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Heading2 = styled('h2')(({ theme }) => ({
  fontSize: theme.spacing(3),
  fontWeight: 400,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Heading3 = styled('h3')(({ theme }) => ({
  fontSize: theme.spacing(2.5),
  fontWeight: 500,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Heading4 = styled('h4')(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: 600,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Heading5 = styled('h5')(({ theme }) => ({
  fontSize: theme.spacing(1.5),
  fontWeight: 700,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Heading6 = styled('h6')(({ theme }) => ({
  fontSize: theme.spacing(1.25),
  fontWeight: 800,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));

const Paragraph = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Image = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}));

const StyledTable = styled(Table)<TableProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.divider
}));

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const HorizontalRule = styled(Divider)<DividerProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const UnorderedList = styled('ul')(({ theme }) => ({
  paddingLeft: theme.spacing(4)
}));

const OrderedList = styled('ol')(({ theme }) => ({
  paddingLeft: theme.spacing(4)
}));

const ListItem = styled('li')(({ theme }) => ({
  ...theme.typography.body1,
  '& > p:first-child': {
    marginBottom: 0,
  },
  '& > *:first-child': {
    marginTop: 0,
  },
  '& > *:last-child': {
    marginBottom: 0
  }
}));

const Blockquote = styled('blockquote')(({ theme }) => ({
  borderLeft: theme.palette.grey.A400 + ' 3px solid',
  paddingLeft: theme.spacing(2),
  marginLeft: 0,
  marginRight: 0,
}));

const components: Options['components'] = {
    hr: (props) => <HorizontalRule {...props} />,
    a: (props) => <Link {...props} />,
    img: (props) => <Image {...props} />,
    ol: (props) => <OrderedList {...props} />,
    ul: (props) => <UnorderedList {...props} />,
    li: (props) => <ListItem {...props} />,
    h1: (props) => <Heading1 {...props} />,
    h2: (props) => <Heading2 {...props} />,
    h3: (props) => <Heading3 {...props} />,
    h4: (props) => <Heading4 {...props} />,
    h5: (props) => <Heading5 {...props} />,
    h6: (props) => <Heading6 {...props} />,
    p: (props) => <Paragraph {...props} />,
    table: (props) => <StyledTable size="small" {...props} />,
    th: (props) => <StyledTableCell align='left' {...props as any} />,
    td: (props) => <StyledTableCell {...props as any} />,
    tr: (props) => <TableRow {...props} />,
    thead: (props) => <TableHead {...props} />,
    tbody: (props) => <TableBody {...props} />,
    tfoot: (props) => <TableFooter {...props} />,
    code: (props) => <Code {...props} />,
    input: (props) => <Input {...props} />,
    blockquote: (props) => <Blockquote {...props} />,
}

export default components;
