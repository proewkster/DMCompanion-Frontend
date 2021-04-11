import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Sense } from 'src/app/admin/models/sourcedata/dto_sourcedata_sense';
import { SourceData_Sense } from 'src/app/admin/models/sourcedata/sourcedata_sense';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-edit-sense',
  templateUrl: './edit-sense.component.html',
  styleUrls: ['./edit-sense.component.scss']
})
export class EditSenseComponent implements OnInit, AfterViewInit {

  public editSenseForm: FormGroup;
  public isSubmitted = false;
  public sense: SourceData_Sense;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editSenseForm = this._formBuilder.group({
      id: [this.sense.id],
      name: [this.sense.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.sense.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.sense.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editSenseForm.controls[controlName].invalid && (this.editSenseForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSenseForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Sense
  public editSense = (editSenseValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editSenseForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editSenseValue };

    // Create instance of Sense model
    const sense: DTO_SourceData_Sense = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 5
    }

    // Create Sense in API
    this._sourcedataService.updateSense(sense)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
