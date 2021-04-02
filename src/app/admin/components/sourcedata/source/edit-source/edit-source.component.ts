import { SourceData_Source } from './../../../../models/sourcedata/sourcedata_source';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { DTO_SourceData_Source } from 'src/app/admin/models/sourcedata/dto_sourcedata_source';

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.scss']
})
export class EditSourceComponent implements OnInit {

  public editSourceForm: FormGroup;
  public isSubmitted = false;
  public source: SourceData_Source;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editSourceForm = this._formBuilder.group({
      sourceId: [this.source.id],
      sourceName: [this.source.name, [Validators.required, Validators.maxLength(100)]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editSourceForm.controls[controlName].invalid && (this.editSourceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSourceForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Source
  public editSource = (editSourceValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editSourceForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editSourceValue };

    // Create instance of Source model
    const source: DTO_SourceData_Source = {
      id: formValues.sourceId,
      name: formValues.sourceName
    }

    // Create source in API
    this._sourcedataService.updateSource(source)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }

}
