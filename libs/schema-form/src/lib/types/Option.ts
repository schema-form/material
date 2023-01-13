export type Option<T = any> = {
  value: T;
  label: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
}

export type JSONOption = Option<string>;
