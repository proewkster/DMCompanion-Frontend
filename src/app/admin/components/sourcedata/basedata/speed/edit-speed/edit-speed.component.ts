import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Speed } from 'src/app/admin/models/sourcedata/dto_sourcedata_speed';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourceData_Speed } from 'src/app/admin/models/sourcedata/sourcedata_speed';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-edit-speed',
  templateUrl: './edit-speed.component.html',
  styleUrls: ['./edit-speed.component.scss']
})
export class EditSpeedComponent implements OnInit, AfterViewInit {

  public editSpeedForm: FormGroup;
  public isSubmitted = false;
  public speed: SourceData_Speed;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editSpeedForm = this._formBuilder.group({
      id: [this.speed.id],
      name: [this.speed.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.speed.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.speed.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editSpeedForm.controls[controlName].invalid && (this.editSpeedForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSpeedForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Speed
  public editSpeed = (editSpeedValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editSpeedForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editSpeedValue };

    // Create instance of Speed model
    const speed: DTO_SourceData_Speed = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 7
    }

    // Create Speed in API
    this._sourcedataService.updateSpeed(speed)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
