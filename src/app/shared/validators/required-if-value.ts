import { isNull } from '@angular/compiler/src/output/output_ast';
import { ValidatorFn, FormGroup } from '@angular/forms';

export function RequiredIfValue(controlName: string, targetControlName: string, controlValue: any) : ValidatorFn {
    return (formGroup: FormGroup) => {

        // Get target control value
        const control = formGroup.controls[controlName];
        const targetControl = formGroup.controls[targetControlName];

        // Stop function if other errors are already detected
        if (targetControl.errors && !targetControl.errors.requiredIfValue) {
            return null;
        }

        // Match control value 
        if (targetControl.value === controlValue && control.value === null) { // Check if target control value matches required value
            control.setErrors({ requiredIfValue: true });
        }
        else {
            control.setErrors(null);
        }
    }
}