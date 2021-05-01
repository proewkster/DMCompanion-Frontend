import { Observable, of } from 'rxjs';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { SourceData_Condition } from './sourcedata_condition';
import { SourceData_Modifier_Influence } from "./sourcedata_modifier_influence";

export class SourceData_Modifier_Influence_Condition_Add extends SourceData_Modifier_Influence {
    condition: SourceData_Condition;

    modifierType = ModifierType.Influence_Condition_Add;

    conditionOptions: SourceData_Condition[];
    
    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "conditionId",
                label: "Condition",
                value: this.condition?.id || '',
                required: true,
                order: 5,
                options: DynamicFormConverters.baseDataAsOptions(this.conditionOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}