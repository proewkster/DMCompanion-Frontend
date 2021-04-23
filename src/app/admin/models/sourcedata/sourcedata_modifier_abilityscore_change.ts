import { DynamicFormControl_Select } from '../../../shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormControl_Text } from '../../../shared/models/dynamic-forms/dynamicformcontrol-text';
import { DynamicFormControl_Base } from "src/app/shared/models/dynamic-forms/dynamicformcontrol-base";
import { SourceData_AbilityScore } from "./sourcedata_abilityscore";
import { SourceData_Modifier } from "./sourcedata_modifier";
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { Observable, of } from 'rxjs';
import { ModifierType } from 'src/app/enums/modifier-type.enum';

export class SourceData_Modifier_AbilityScore_Change extends SourceData_Modifier {
    value: number;
    abilityScore: SourceData_AbilityScore;

    modifierType = ModifierType.AbilityScore_Change;

    abilityScoreOptions: SourceData_AbilityScore[];

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Number ({
                key: "value",
                label: "Value",
                value: this.value,
                required: true,
                range: true,
                rangeMin: -5,
                rangeMax: 5,
                order: 3
            }),

            new DynamicFormControl_Select ({
                key: "abilityScoreId",
                label: "Ability Score",
                value: this.abilityScore?.id || '',
                required: true,
                order: 4,
                options: DynamicFormConverters.baseDataAsOptions(this.abilityScoreOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }    
}