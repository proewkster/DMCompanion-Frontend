import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Speed } from 'src/app/admin/models/sourcedata/dto_sourcedata_speed';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-speed',
  templateUrl: './add-speed.component.html',
  styleUrls: ['./add-speed.component.scss']
})
export class AddSpeedComponent implements OnInit, AfterViewInit {

  public addSpeedForm: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addSpeedForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addSpeedForm.controls[controlName].invalid && (this.addSpeedForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSpeedForm.controls[controlName].hasError(errorName);
  }

  // Submit new Speed
  public createSpeed = (addSpeedValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addSpeedForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addSpeedValue };

    // Create instance of Speed model
    const speed: DTO_SourceData_Speed = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 7
    }

    // Create Speed in API
    this._sourcedataService.createSpeed(speed)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
