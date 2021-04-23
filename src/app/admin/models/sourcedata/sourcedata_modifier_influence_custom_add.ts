import { Observable, of } from "rxjs";
import { ModifierType } from "src/app/enums/modifier-type.enum";
import { DynamicFormControl_Base } from "src/app/shared/models/dynamic-forms/dynamicformcontrol-base";
import { DynamicFormControl_TextArea } from "src/app/shared/models/dynamic-forms/dynamicformcontrol-textarea";
import { SourceData_Modifier_Influence } from "./sourcedata_modifier_influence";

export class SourceData_Modifier_Influence_Custom_Add extends SourceData_Modifier_Influence {
    customDescriptor: string;

    modifierType = ModifierType.Influence_Custom_Add;

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_TextArea({
                key: "customDescriptor",
                label: "Influence Description",
                value: this.customDescriptor,
                rows: 5,
                required: true,
                maxLength: true,
                maxLengthValue: 1000,
                order: 5,
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}