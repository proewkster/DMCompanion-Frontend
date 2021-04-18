import { SourceData_Skill } from './sourcedata_skill';
import { SourceData_Modifier } from './sourcedata_modifier';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { Observable, of } from 'rxjs';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';

export class SourceData_Modifier_Skill_Proficient extends SourceData_Modifier {
    skill: SourceData_Skill;

    modifierType = ModifierType.Skill_Proficient;

    skillOptions: SourceData_Skill[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "skillId",
                label: "Skill",
                value: this.skill?.id || '',
                required: true,
                order: 3,
                options: DynamicFormConverters.baseDataAsOptions(this.skillOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}