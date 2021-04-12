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
  selector: 'app-edit-ability',
  templateUrl: './edit-ability.component.html',
  styleUrls: ['./edit-ability.component.scss']
})
export class EditAbilityComponent implements OnInit, AfterViewInit {

  public editAbilityForm: FormGroup;
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
    this.editAbilityForm = this._formBuilder.group({
      id: [this.ability.id],
      name: [this.ability.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.ability.description, [Validators.required, Validators.maxLength(1000)]],
      type: [this.ability.type, [Validators.required, Validators.maxLength(100)]],
      restoreCondition: [this.ability.restoreCondition, [Validators.required, Validators.maxLength(100)]],
      maxSlots: [this.ability.maxSlots, [Validators.required, CustomValidators.range(0, 100)]],
      sourceId: [this.ability.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editAbilityForm.controls[controlName].invalid && (this.editAbilityForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editAbilityForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Ability
  public editAbility = (editAbilityValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editAbilityForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editAbilityValue };

    // Create instance of Ability model
    const ability: DTO_SourceData_Ability = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      restoreCondition: formValues.restoreCondition,
      maxSlots: formValues.maxSlots,
      sourceId: formValues.sourceId
    }

    // Create Ability in API
    this._sourcedataService.updateAbility(ability)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
