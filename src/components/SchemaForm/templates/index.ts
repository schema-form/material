import BaseInputTemplate from "./BaseInputTemplate";
import ErrorListTemplate from "./ErrorListTemplate";
import ArrayFieldItemTemplate from "./ArrayFieldItemTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ArrayFieldTitleTemplate from "./ArrayFieldTitleTemplate";
import ArrayFieldDescriptionTemplate from "./ArrayFieldDescriptionTemplate";
import FieldTemplate from "./FieldTemplate";
import TitleFieldTemplate from "./TitleFieldTemplate";
import DescriptionFieldTemplate from "./DescriptionFieldTemplate";
import UnsupportedFieldTemplate from "./UnsupportedFieldTemplate";
import AddButtonTemplate from "./buttons/AddButtonTemplate";
import SubmitButtonTemplate from "./buttons/SubmitButtonTemplate";
import RemoveButtonTemplate from "./buttons/RemoveButtonTemplate";
import MoveUpButtonTemplate from "./buttons/MoveUpButtonTemplate";
import MoveDownButtonTemplate from "./buttons/MoveDownButtonTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";

export const TEMPLATES = {
    BaseInputTemplate,
    ErrorListTemplate,
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    ArrayFieldTitleTemplate,
    ArrayFieldDescriptionTemplate,
    FieldHelpTemplate: () => null,
    FieldErrorTemplate: () => null,
    FieldTemplate,
    TitleFieldTemplate,
    DescriptionFieldTemplate,
    UnsupportedFieldTemplate,
    ObjectFieldTemplate,
    ButtonTemplates: {
        AddButton: AddButtonTemplate,
        SubmitButton: SubmitButtonTemplate,
        RemoveButton: RemoveButtonTemplate,
        MoveUpButton: MoveUpButtonTemplate,
        MoveDownButton: MoveDownButtonTemplate,
    }
}

export default TEMPLATES;
