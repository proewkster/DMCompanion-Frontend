import { Observable, of } from 'rxjs';
import { DamageType } from 'src/app/enums/damage-type.enum';
import { HitPointVariables } from 'src/app/enums/hitpoint-variables.enum';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormControl_SelectEnum } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-selectenum';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { SourceData_Modifier } from './sourcedata_modifier';

export class SourceData_Modifier_HitPointMaximum_Change extends SourceData_Modifier {
    variable: string;

    modifierType = ModifierType.HitPointMaximum_Change;

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {

        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_SelectEnum ({
                key: "variable",
                label: "Property containing value",
                value: this.variable || '',
                required: true,
                order: 3,
                options: DynamicFormConverters.enumAsOptions(HitPointVariables)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }
}