import { SourcedataService } from './../../../../services/sourcedata.service';
import { DTO_SourceData_Source } from './../../../../models/sourcedata/dto_sourcedata_source';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateLocaleAndSetLanguage } from 'typescript';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-sourcedata-addsource',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss']
})
export class AddSourceComponent implements OnInit {

  public addSourceForm: FormGroup;
  public isSubmitted = false;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addSourceForm = this._formBuilder.group({
      sourceName: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addSourceForm.controls[controlName].invalid && (this.addSourceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSourceForm.controls[controlName].hasError(errorName);
  }

  // Submit new Source
  public createSource = (addSourceValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addSourceForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addSourceValue };

    // Create instance of Source model
    const source: DTO_SourceData_Source = {
      name: formValues.sourceName
    }

    // Create source in API
    this._sourcedataService.createSource(source)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
