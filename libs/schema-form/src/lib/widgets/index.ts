import TextFieldWidget from "./TextFieldWidget";
import TextWidget from "./TextWidget";
import UploadWidget from "./UploadWidget";
import CheckboxWidget from "./CheckboxWidget";
import CheckboxGroupWidget from "./CheckboxGroupWidget";
import RadioGroupWidget from "./RadioGroupWidget";
import DateTimePickerWidget from "./DateTimePickerWidget";
import DatePickerWidget from "./DatePickerWidget";
import SelectWidget from "./SelectWidget";
import PasswordFieldWidget from "./PasswordFieldWidget";
import ColorFieldWidget from "./ColorFieldWidget";
import EditorWidget from "./EditorWidget";
import MarkdownEditorWidget from "./MarkdownEditorWidget";
import SchemaEditorWidget from "./SchemaEditorWidget";
import TimePickerWidget from "./TimePickerWidget";
import SwitchWidget from "./SwitchWidget";
import AutocompleteWidget from "./AutocompleteWidget";
import SliderWidget from "./SliderWidget";
import SliderFieldWidget from "./SliderFieldWidget";

export const DEFAULT_WIDGETS = {
    AltDateTimeWidget: DateTimePickerWidget,
    AltDateWidget: DatePickerWidget,
    CheckboxWidget,
    CheckboxesWidget: CheckboxGroupWidget,
    ColorWidget: ColorFieldWidget,
    DateTimeWidget: DateTimePickerWidget,
    DateWidget: DatePickerWidget,
    EmailWidget: TextFieldWidget,
    FileWidget: UploadWidget,
    // HiddenWidget,
    PasswordWidget: PasswordFieldWidget,
    RadioWidget: RadioGroupWidget,
    RangeWidget: SliderFieldWidget,
    SelectWidget,
    TextWidget: TextWidget,
    TextareaWidget: TextFieldWidget,
    URLWidget: TextFieldWidget,
    // UpDownWidget,
}

export const MUI_WIDGETS = {
    'editor': EditorWidget,
    'markdown-editor': MarkdownEditorWidget,
    'schema-editor': SchemaEditorWidget,
    'checkbox': CheckboxWidget,
    'checkbox-group': CheckboxGroupWidget,
    'date-picker': DatePickerWidget,
    'time-picker': TimePickerWidget,
    'date-time-picker': DateTimePickerWidget,
    'text-field': TextFieldWidget,
    'radio-group': RadioGroupWidget,
    'select': SelectWidget,
    'file-upload': UploadWidget,
    'switch': SwitchWidget,
    'autocomplete': AutocompleteWidget,
    'slider': SliderWidget,
    'slider-field': SliderFieldWidget,
    'password-field': PasswordFieldWidget,
    'color-field': ColorFieldWidget,
    'upload': UploadWidget,
};

export const WIDGETS = {
    ...DEFAULT_WIDGETS,
    ...MUI_WIDGETS
}

export default WIDGETS;
