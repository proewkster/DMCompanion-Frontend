import { DynamicFormControl_Base } from "./dynamicformcontrol-base";

export class DynamicFormControl_SelectEnum extends DynamicFormControl_Base<string> {
    // Define default properties
    controlType = 'selectpicker_enum';
}