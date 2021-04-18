import { InfluenceClass } from './../../../enums/influence-class.enum';
import { Observable, of } from 'rxjs';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Number } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-number';
import { DynamicFormControl_Select } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-select';
import { DynamicFormConverters } from 'src/app/shared/services/dynamic-form-converters';
import { SourceData_Modifier } from './sourcedata_modifier';
import { InfluenceType } from 'src/app/enums/influence-type.enum';

export abstract class SourceData_Modifier_Influence extends SourceData_Modifier {
    class: string;
    type: string;

    getFormControlTemplates(): Observable<DynamicFormControl_Base<any>[]> {
        
        let formControls: DynamicFormControl_Base<any>[] = [];
        
        super.getFormControlTemplates().subscribe(data => {
            formControls = data;
        });

        formControls.push(
            new DynamicFormControl_Select ({
                key: "class",
                label: "Influence Class",
                value: this.class || '',
                required: true,
                order: 3,
                options: DynamicFormConverters.enumAsOptions(InfluenceClass)
            }),
            
            new DynamicFormControl_Select ({
                key: "type",
                label: "Influence Type",
                value: this.type || '',
                required: true,
                order: 4,
                options: DynamicFormConverters.enumAsOptions(InfluenceType)
            }),
        );

        return of(formControls.sort((a,b) => a.order - b.order));
    }   
}