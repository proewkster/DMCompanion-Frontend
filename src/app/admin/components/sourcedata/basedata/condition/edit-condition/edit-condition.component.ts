import { SourceData_Source } from './../../../../../models/sourcedata/sourcedata_source';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourceData_Condition } from 'src/app/admin/models/sourcedata/sourcedata_condition';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Condition } from 'src/app/admin/models/sourcedata/dto_sourcedata_condition';

declare var $: any;

@Component({
  selector: 'app-edit-condition',
  templateUrl: './edit-condition.component.html',
  styleUrls: ['./edit-condition.component.scss']
})
export class EditConditionComponent implements OnInit, AfterViewInit {

  public editConditionForm: FormGroup;
  public isSubmitted = false;
  public condition: SourceData_Condition;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editConditionForm = this._formBuilder.group({
      id: [this.condition.id],
      name: [this.condition.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.condition.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.condition.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editConditionForm.controls[controlName].invalid && (this.editConditionForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editConditionForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Condition
  public editCondition = (editConditionValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editConditionForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editConditionValue };

    // Create instance of Condition model
    const condition: DTO_SourceData_Condition = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 1
    }

    // Create Condition in API
    this._sourcedataService.updateCondition(condition)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
