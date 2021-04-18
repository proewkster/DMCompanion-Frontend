import { DefenseType } from './../../../enums/defense-type.enum';
import { Observable, of } from 'rxjs';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { SourceData_Modifier } from './sourcedata_modifier';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DamageType } from 'src/app/enums/damage-type.enum';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';

export class SourceData_Modifier_Defense_Add extends SourceData_Modifier {
    type: string;
    damageType: SourceData_DamageType

    modifierType = ModifierType.Defense_Add;

    damageTypeOptions: SourceData_DamageType[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {

        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "type",
                label: "Type",
                value: this.type || '',
                required: true,
                order: 3,
                options: DynamicFormConverters.enumAsOptions(DefenseType)
            }),

            new DynamicFormControl_Select ({
                key: "damageTypeId",
                label: "Damage Type",
                value: this.damageType?.id || '',
                required: true,
                order: 4,
                options: DynamicFormConverters.baseDataAsOptions(this.damageTypeOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }
}