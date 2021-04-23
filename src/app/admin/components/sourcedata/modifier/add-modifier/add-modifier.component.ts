import { DTO_SourceData_Modifier_AbilityScore_Change } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_abilityscore_change';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Modifier } from 'src/app/admin/models/sourcedata/sourcedata_modifier';
import { ModifierType } from 'src/app/enums/modifier-type.enum';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';
import { DTO_SourceData_Modifier } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { DTO_SourceData_Modifier_Defense_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_defense_add';
import { DTO_SourceData_Modifier_HitPointMaximum_Change } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_hitpointmaximum_change';
import { DTO_SourceData_Modifier_Influence_Condition_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_influence_condition_add';
import { DTO_SourceData_Modifier_Influence_Custom_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_influence_custom_add';
import { DTO_SourceData_Modifier_Influence_DamageType_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_influence_damagetype_add';
import { DTO_SourceData_Modifier_Proficiency_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_proficiency_add';
import { DTO_SourceData_Modifier_Sense_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_sense_add';
import { DTO_SourceData_Modifier_Skill_Proficient } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_skill_proficient';
import { DTO_SourceData_Modifier_Speed_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_speed_add';
import { DTO_SourceData_Modifier_Spell_Add } from 'src/app/admin/models/sourcedata/dto_sourcedata_modifier_spell_add';

@Component({
  selector: 'app-add-modifier',
  templateUrl: './add-modifier.component.html',
  styleUrls: ['./add-modifier.component.scss']
})
export class AddModifierComponent implements OnInit {

  public modifier: SourceData_Modifier;
  public title: string;
  public formControls: DynamicFormControl_Base<any>[];

  constructor(private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.modifier.getFormControlTemplates().subscribe(data => {
      this.formControls = data;
    });
  }

  // Listener method for child component that will emit the data from the form
  processData = (data: string) => {
    // Parse json data into proper modifier class, based on type
    let modifier = this.generateDto(data);

    // Create modifier in API
    this._sourcedataService.createModifier(modifier)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }

  generateDto = (data: string): DTO_SourceData_Modifier => {

    // Initialize return value
    let modifier;

    // Create proper instance of modifier class
    switch (this.modifier.modifierType) {
      case ModifierType.AbilityScore_Change:
        modifier = new DTO_SourceData_Modifier_AbilityScore_Change();
        break;
      case ModifierType.Defense_Add:
        modifier = new DTO_SourceData_Modifier_Defense_Add();
        break;
      case ModifierType.HitPointMaximum_Change:
        modifier = new DTO_SourceData_Modifier_HitPointMaximum_Change();
        break;
      case ModifierType.Influence_Condition_Add:
        modifier = new DTO_SourceData_Modifier_Influence_Condition_Add();
        break;
      case ModifierType.Influence_Custom_Add:
        modifier = new DTO_SourceData_Modifier_Influence_Custom_Add();
        break;
      case ModifierType.Influence_DamageType_Add:
        modifier = new DTO_SourceData_Modifier_Influence_DamageType_Add();
        break;
      case ModifierType.Proficiency_Add:
        modifier = new DTO_SourceData_Modifier_Proficiency_Add();
        break;
      case ModifierType.Sense_Add:
        modifier = new DTO_SourceData_Modifier_Sense_Add();
        break;
      case ModifierType.Skill_Proficient:
        modifier = new DTO_SourceData_Modifier_Skill_Proficient();
        break;
      case ModifierType.Speed_Add:
        modifier = new DTO_SourceData_Modifier_Speed_Add();
        break;
      case ModifierType.Spell_Add:
        modifier = new DTO_SourceData_Modifier_Spell_Add();
        break;        
      default:
        throw new Error("Invalid Modifier Type");
    }

    // Merge JSON data into modifier object and return result
    return Object.assign(modifier, JSON.parse(data));
  }
}
