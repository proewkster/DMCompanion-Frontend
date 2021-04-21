import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AreaEffect } from 'src/app/admin/models/sourcedata/sourcedata_areaeffect';
import { AreaType } from 'src/app/enums/area-type.enum';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';

declare var $: any;

@Component({
  selector: 'app-edit-area-effect',
  templateUrl: './edit-area-effect.component.html',
  styleUrls: ['./edit-area-effect.component.scss']
})
export class EditAreaEffectComponent implements OnInit, AfterViewInit {

  public editAreaEffectForm: FormGroup;
  public isSubmitted = false;
  public title: string;
  public areaEffect: SourceData_AreaEffect;
  public areaTypes = AreaType;
  public keys = Object.keys;

  constructor(private _formBuilder: FormBuilder, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    // Designate form and configure validation
    this.editAreaEffectForm = this._formBuilder.group({
      areaSize: [this.areaEffect.areaSize, [Validators.required, CustomValidators.range(0, 1000)]],
      areaType: [this.areaEffect.areaType, [Validators.required]]
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editAreaEffectForm.controls[controlName].invalid && (this.editAreaEffectForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editAreaEffectForm.controls[controlName].hasError(errorName);
  }

  // Edit AreaEffect object
  public editAreaEffect = (addAreaEffectValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editAreaEffectForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addAreaEffectValue };

    // Create instance of AreaEffect model
    const areaEffect: SourceData_AreaEffect = {
      areaSize: formValues.areaSize,
      areaType: formValues.areaType
    }

    // Return model to calling instance
    this._activeModal.close(areaEffect);
  }
}
