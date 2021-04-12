import { CustomValidators } from './../../../../../../shared/validators/CustomValidators';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Ability } from 'src/app/admin/models/sourcedata/dto_sourcedata_ability';
import { SourceData_Ability } from 'src/app/admin/models/sourcedata/sourcedata_ability';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AbilityType } from 'src/app/enums/ability-type.enum';
import { RestoreCondition } from 'src/app/enums/restore-condition.enum';

declare var $: any;

@Component({
  selector: 'app-add-ability',
  templateUrl: './add-ability.component.html',
  styleUrls: ['./add-ability.component.scss']
})
export class AddAbilityComponent implements OnInit, AfterViewInit {

  public addAbilityForm: FormGroup;
  public isSubmitted = false;
  public ability: SourceData_Ability;
  public sources: [SourceData_Source];
  public abilityTypes = AbilityType;
  public restoreConditions = RestoreCondition;
  public keys = Object.keys;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addAbilityForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      type: [null, [Validators.required, Validators.maxLength(100)]],
      restoreCondition: [null, [Validators.required, Validators.maxLength(100)]],
      maxSlots: [1, [Validators.required, CustomValidators.range(0, 100)]],
      sourceId: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addAbilityForm.controls[controlName].invalid && (this.addAbilityForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addAbilityForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Ability
  public createAbility = (addAbilityValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addAbilityForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addAbilityValue };

    // Create instance of Ability model
    const ability: DTO_SourceData_Ability = {
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      restoreCondition: formValues.restoreCondition,
      maxSlots: formValues.maxSlots,
      sourceId: formValues.sourceId
    }

    // Create Ability in API
    this._sourcedataService.createAbility(ability)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}