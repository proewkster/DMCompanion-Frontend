import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Condition } from 'src/app/admin/models/sourcedata/dto_sourcedata_condition';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrls: ['./add-condition.component.scss']
})
export class AddConditionComponent implements OnInit, AfterViewInit {

  public addConditionForm: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addConditionForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addConditionForm.controls[controlName].invalid && (this.addConditionForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addConditionForm.controls[controlName].hasError(errorName);
  }

  // Submit new Condition
  public createCondition = (addConditionValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addConditionForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addConditionValue };

    // Create instance of Condition model
    const condition: DTO_SourceData_Condition = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 1
    }

    // Create Condition in API
    this._sourcedataService.createCondition(condition)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
