import { ModifierTypeService } from './../../../../services/modifier-type.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { SourceData_Modifier } from 'src/app/admin/models/sourcedata/sourcedata_modifier';

declare var $: any;

@Component({
  selector: 'app-get-modifier-type',
  templateUrl: './get-modifier-type.component.html',
  styleUrls: ['./get-modifier-type.component.scss']
})
export class GetModifierTypeComponent implements OnInit, AfterViewInit {

  public getModifierTypeForm: FormGroup;
  public modifierTypes = ModifierType;
  public keys = Object.keys;
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _modifierTypeService: ModifierTypeService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    // Designate form and configure validation
    this.getModifierTypeForm = this._formBuilder.group({
      modifierType: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.getModifierTypeForm.controls[controlName].invalid && (this.getModifierTypeForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.getModifierTypeForm.controls[controlName].hasError(errorName);
  }

  // Process Selection
  public CreateNewModifier = (formData) => {
    
    // Initialize properties
    this.isSubmitted = true;
    let modifier: any;

    // Stop if form is invalid
    if (this.getModifierTypeForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...formData };
    const selection = this.modifierTypes[formValues.modifierType];
    
    // Process selected type
    switch (selection) {
      case ModifierType.AbilityScore_Change:
        this._modifierTypeService.getAbilityScore_Change.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Defense_Add:
        this._modifierTypeService.getDefense_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.HitPointMaximum_Change:
        this._modifierTypeService.getHitPointMaximum_Change.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Influence_Condition_Add:
        this._modifierTypeService.getInfluence_Condition_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Influence_Custom_Add:
        this._modifierTypeService.getInfluence_Custom_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Influence_DamageType_Add:
        this._modifierTypeService.getInfluence_DamageType_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Proficiency_Add:
        this._modifierTypeService.getProficiency_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Sense_Add:
        this._modifierTypeService.getSense_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Skill_Proficient:
        this._modifierTypeService.getSkill_Proficient.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Speed_Add:
        this._modifierTypeService.getSpeed_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;
      case ModifierType.Spell_Add:
        this._modifierTypeService.getSpell_Add.subscribe(data => {
          this._activeModal.close(data);
        });
        break;        
      default:
        throw new Error("No valid Modifier Type selected");
    }
  }
}
