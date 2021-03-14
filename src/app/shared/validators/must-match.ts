import { FormGroup, ValidatorFn } from '@angular/forms';


export function MustMatch(controlName: string, matchedControlName: string) : ValidatorFn{
    return (formGroup: FormGroup) => {

        // Get controls from FormGroup
        const control = formGroup.controls[controlName];
        const matchedControl = formGroup.controls[matchedControlName];

        // Stop function when other errors are already detected
        if (matchedControl.errors && !matchedControl.errors.mustMatch) {
            return null;
        }

        // Set an error on the matched control if validation fails
        if (control.value !== matchedControl.value) {
            matchedControl.setErrors({ mustMatch: true });
        }
        else {
            matchedControl.setErrors(null);
        }
    }
}