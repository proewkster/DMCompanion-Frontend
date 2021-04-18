import { SourceData_Proficiency } from './sourcedata_proficiency';
import { SourceData_Modifier } from './sourcedata_modifier';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { Observable, of } from 'rxjs';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';

export class SourceData_Modifier_Proficiency_Add extends SourceData_Modifier {
    proficiency: SourceData_Proficiency;

    modifierType = ModifierType.Proficiency_Add;

    proficiencyOptions: SourceData_Proficiency[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "proficiencyId",
                label: "Proficiency",
                value: this.proficiency?.id || '',
                required: true,
                order: 3,
                options: DynamicFormConverters.baseDataAsOptions(this.proficiencyOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}