import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';

export class DynamicFormControl_TextArea extends DynamicFormControl_Base<string> {
    // Define default properties
    controlType = "textarea";
}