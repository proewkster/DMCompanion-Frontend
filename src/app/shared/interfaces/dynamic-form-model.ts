import { Observable } from "rxjs";
import { DynamicFormControl_Base } from "../models/dynamic-forms/dynamicformcontrol-base";

export interface DynamicFormModel {
    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]>;
}