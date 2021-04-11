import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Sense } from 'src/app/admin/models/sourcedata/dto_sourcedata_sense';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-sense',
  templateUrl: './add-sense.component.html',
  styleUrls: ['./add-sense.component.scss']
})
export class AddSenseComponent implements OnInit, AfterViewInit {

  public addSenseform: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addSenseform = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addSenseform.controls[controlName].invalid && (this.addSenseform.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSenseform.controls[controlName].hasError(errorName);
  }

  // Submit new Sense
  public createSense = (addSenseValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addSenseform.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addSenseValue };

    // Create instance of Sense model
    const sense: DTO_SourceData_Sense = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 5
    }

    // Create Sense in API
    this._sourcedataService.createSense(sense)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
