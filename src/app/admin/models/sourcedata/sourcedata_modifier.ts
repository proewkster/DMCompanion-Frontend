import { Observable, of } from 'rxjs';
import { ModifierDiscriminator } from 'src/app/enums/modifier-discriminator.enum';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormControl_Text } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-text';
import { DynamicFormControl_TextArea } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-textarea';
import { DynamicFormModel } from './../../../shared/interfaces/dynamic-form-model';

export class SourceData_Modifier implements DynamicFormModel {
    id: string;
    name: string;
    description: string;
    discriminator: ModifierDiscriminator;

    modifierType: ModifierType;

    getFormControlTemplates() : Observable<DynamicFormControl_Base<any>[]> {

        let formControls: DynamicFormControl_Base<any>[] = [
            
            new DynamicFormControl_Text({
                key: "name",
                label: "Name",
                value: this.name,
                type: "text",
                required: true,
                maxLength: true,
                maxLengthValue: 100,
                order: 1,
            }),

            new DynamicFormControl_TextArea({
                key: "description",
                label: "Description",
                value: this.description,
                rows: 5,
                required: true,
                maxLength: true,
                maxLengthValue: 1000,
                order: 2,
            })
        ];

        return of(formControls.sort((a, b) => a.order - b.order));
    }
}