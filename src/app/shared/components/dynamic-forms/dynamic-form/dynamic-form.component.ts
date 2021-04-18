import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DynamicFormGroupService } from 'src/app/shared/services/dynamic-form-group.service';

@Component({
  selector: 'shared-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit {

  @Input() formControls: DynamicFormControl_Base<any>[] = [];
  @Input() formName: string;
  @Output() process = new EventEmitter<string>();

  form: FormGroup;

  constructor(private _dynamicFormGroupService: DynamicFormGroupService) { }

  ngOnInit(): void {
    this.form = this._dynamicFormGroupService.toFormGroup(this.formControls);
  }

  onSubmit = (formInput) => {

    // Set parameter to trigger validation
    this.form.markAllAsTouched();
    
    // Stop if form is invalid
    if (this.form.valid) {
      // Get form values
      const formValues = { ...formInput };
  
      // Return data to calling instance through event
      this.process.emit(JSON.stringify(formValues));
    }
  }
}
