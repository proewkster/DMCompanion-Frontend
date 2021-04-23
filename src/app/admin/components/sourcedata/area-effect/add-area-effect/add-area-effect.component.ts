import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AreaEffect } from 'src/app/admin/models/sourcedata/sourcedata_areaeffect';
import { AreaType } from 'src/app/enums/area-type.enum';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';

declare var $: any;

@Component({
  selector: 'app-add-area-effect',
  templateUrl: './add-area-effect.component.html',
  styleUrls: ['./add-area-effect.component.scss']
})
export class AddAreaEffectComponent implements OnInit, AfterViewInit {

  public addAreaEffectForm: FormGroup;
  public isSubmitted = false;
  public title: string;
  public areaTypes = AreaType;
  public keys = Object.keys;

  constructor(private _formBuilder: FormBuilder, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    // Designate form and configure validation
    this.addAreaEffectForm = this._formBuilder.group({
      areaSize: [null, [Validators.required, CustomValidators.range(0, 1000)]],
      areaType: [null, [Validators.required]]
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addAreaEffectForm.controls[controlName].invalid && (this.addAreaEffectForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addAreaEffectForm.controls[controlName].hasError(errorName);
  }

  // Create AreaEffect object
  public createAreaEffect = (addAreaEffectValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addAreaEffectForm.invalid) {
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
