import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static range(min: number, max: number): ValidatorFn {
        return (control: FormControl): {[key: string]: any} => {

            // Get current control value
            let val: number = control.value;

            // Check if value is a number
            if (isNaN(val)) {
                return null;
            }

            // Validate value
            if (val < min || val > max) {
                return {"range": true};
            }

            // If we reach this point, validation either succeeded or is not relevant
            return null;
        }
    }

    static compareNumber(operator: string, sourceControl: string, targetControl: string): ValidatorFn {
        return (formGroup: FormGroup) => {
            try {
                // Get current control values
                const sourceVal: number = formGroup.get(sourceControl).value;
                const targetVal: number = formGroup.get(targetControl).value;
    
                // Initialize validation variable
                let result = false;
    
                // Compare number to target based on operator
                switch (operator) {
                    case "eq":
                        result = sourceVal === targetVal ? true : false;
                        break;
                    case "ne":
                        result = sourceVal !== targetVal ? true : false;
                        break;
                    case "lt":
                        result = sourceVal < targetVal ? true : false;
                        break;
                    case "le":
                        result = sourceVal <= targetVal ? true : false;
                        break;
                    case "gt":
                        result = sourceVal > targetVal ? true : false;
                        break;
                    case "ge":
                        result = sourceVal >= targetVal ? true : false;
                        break;
                    default:
                        result = true;
                }
    
                // Check result and set error when needed
                result ? formGroup.get(sourceControl).setErrors(null) : formGroup.get(sourceControl).setErrors({ compareNumber: true }); 
            }
            catch {
                return null;
            }
        }        
    }

    static requiredIf(sourceControl: string, targetControl: string, compareVal: string): ValidatorFn {
        return (formGroup: FormGroup) => {
            // Get current control values
            const targetVal: string = formGroup.get(targetControl).value?.toString();

            // If Target Control has required value, check if Source Control is defined
            if (targetVal === compareVal) {
                formGroup.get(sourceControl).value ? formGroup.get(sourceControl).setErrors(null) : formGroup.get(sourceControl).setErrors({ requiredIf: true });
            }

            return null;
        }
    }
}