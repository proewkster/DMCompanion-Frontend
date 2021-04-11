import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_DamageType } from 'src/app/admin/models/sourcedata/dto_sourcedata_damagetype';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-damage-type',
  templateUrl: './add-damage-type.component.html',
  styleUrls: ['./add-damage-type.component.scss']
})
export class AddDamageTypeComponent implements OnInit, AfterViewInit {

  public addDamageTypeForm: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addDamageTypeForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addDamageTypeForm.controls[controlName].invalid && (this.addDamageTypeForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addDamageTypeForm.controls[controlName].hasError(errorName);
  }

  // Submit new Damage Type
  public createDamageType = (addDamageTypeValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addDamageTypeForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addDamageTypeValue };

    // Create instance of Damage Type model
    const damageType: DTO_SourceData_DamageType = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 2
    }

    // Create Damage Type in API
    this._sourcedataService.createDamageType(damageType)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
