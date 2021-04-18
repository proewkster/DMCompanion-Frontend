import { Observable, of } from 'rxjs';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { SourceData_DamageType } from './sourcedata_damagetype';
import { SourceData_Modifier_Influence } from "./sourcedata_modifier_influence";

export class SourceData_Modifier_Influence_DamageType_Add extends SourceData_Modifier_Influence {
    damageType: SourceData_DamageType;

    modifierType = ModifierType.Influence_DamageType_Add;

    damageTypeOptions: SourceData_DamageType[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "damageTypeId",
                label: "Damage Type",
                value: this.damageType?.id || '',
                required: true,
                order: 5,
                options: DynamicFormConverters.baseDataAsOptions(this.damageTypeOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}