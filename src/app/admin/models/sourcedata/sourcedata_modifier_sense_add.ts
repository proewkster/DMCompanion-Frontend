import { SourceData_Sense } from './sourcedata_sense';
import { SourceData_Modifier } from './sourcedata_modifier';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { Observable, of } from 'rxjs';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';

export class SourceData_Modifier_Sense_Add extends SourceData_Modifier {
    value: number;
    sense: SourceData_Sense;

    modifierType = ModifierType.Sense_Add;

    senseOptions: SourceData_Sense[];

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
                stepSize: 5,
                rangeMin: 0,
                rangeMax: 1000,
                order: 3
            }),

            new DynamicFormControl_Select ({
                key: "senseId",
                label: "Sense",
                value: this.sense?.id || '',
                required: true,
                order: 4,
                options: DynamicFormConverters.baseDataAsOptions(this.senseOptions)
            })
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}