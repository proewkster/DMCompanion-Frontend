import { CustomValidators } from './../validators/CustomValidators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DynamicFormControl_Base } from '../models/dynamic-forms/dynamicformcontrol-base';

@Injectable({
  providedIn: 'root'
})

// Takes in a list of dynamically generated form controls and returns a form group using those controls
export class DynamicFormGroupService {

  constructor() { }

  toFormGroup = (formControls: DynamicFormControl_Base<any>[]) => {
    // Initialize an empty group to contain all individual control
    const group: any = {};

    // Create a FormControl object for each template and add it to the group
    formControls.forEach(formControl => {
      // Get validators for the template
      let validators = this.populateValidators(formControl);

      // Add FormControl element to group
      group[formControl.key] = validators.length <= 0 ? new FormControl(formControl.value || null)
                                                      : new FormControl(formControl.value || null, validators);
    });

    // Create a FormGroup object based on the group of controls
    return new FormGroup(group);
  }

  private populateValidators = (formControl: DynamicFormControl_Base<any>) => {
    let validators = [];

    if (formControl.required) {
      validators.push(Validators.required);
    }

    if (formControl.maxLength) {
      validators.push(Validators.maxLength(formControl.maxLengthValue));
    }

    if (formControl.range) {
      validators.push(CustomValidators.range(formControl.rangeMin, formControl.rangeMax));
    }

    return validators;
  }
}
