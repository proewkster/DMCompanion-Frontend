import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_DamageType } from 'src/app/admin/models/sourcedata/dto_sourcedata_damagetype';

declare var $: any;

@Component({
  selector: 'app-edit-damage-type',
  templateUrl: './edit-damage-type.component.html',
  styleUrls: ['./edit-damage-type.component.scss']
})
export class EditDamageTypeComponent implements OnInit, AfterViewInit {

  public editDamageTypeForm: FormGroup;
  public isSubmitted = false;
  public damageType: SourceData_DamageType;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editDamageTypeForm = this._formBuilder.group({
      id: [this.damageType.id],
      name: [this.damageType.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.damageType.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.damageType.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editDamageTypeForm.controls[controlName].invalid && (this.editDamageTypeForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editDamageTypeForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Damage Type
  public editDamageType = (editDamageTypeValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editDamageTypeForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editDamageTypeValue };

    // Create instance of Damage Type model
    const damageType: DTO_SourceData_DamageType = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 2
    }

    // Create Damage Type in API
    this._sourcedataService.updateDamageType(damageType)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
