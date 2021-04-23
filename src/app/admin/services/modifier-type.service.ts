import { Observable } from 'rxjs';
import { SourceData_Modifier_Proficiency_Add } from './../models/sourcedata/sourcedata_modifier_proficiency_add';
import { SourceData_Modifier_Influence_Custom_Add } from './../models/sourcedata/sourcedata_modifier_influence_custom_add';
import { SourceData_Modifier_Influence_Condition_Add } from './../models/sourcedata/sourcedata_modifier_influence_condition_add';
import { SourceData_Modifier_AbilityScore_Change } from './../models/sourcedata/sourcedata_modifier_abilityscore_change';
import { Injectable } from '@angular/core';
import { SourcedataService } from './sourcedata.service';
import { SourceData_Modifier_Defense_Add } from '../models/sourcedata/sourcedata_modifier_defense_add';
import { SourceData_Modifier_HitPointMaximum_Change } from '../models/sourcedata/sourcedata_modifier_hitpointmaximum_change';
import { SourceData_Modifier_Influence_DamageType_Add } from '../models/sourcedata/sourcedata_modifier_influence_damagetype_add';
import { SourceData_Modifier_Sense_Add } from '../models/sourcedata/sourcedata_modifier_sense_add';
import { SourceData_Modifier_Skill_Proficient } from '../models/sourcedata/sourcedata_modifier_skill_proficient';
import { SourceData_Modifier_Speed_Add } from '../models/sourcedata/sourcedata_modifier_speed_add';
import { SourceData_Modifier_Spell_Add } from '../models/sourcedata/sourcedata_modifier_spell_add';
import { SourceData_Modifier } from '../models/sourcedata/sourcedata_modifier';

@Injectable({
  providedIn: 'root'
})
export class ModifierTypeService {

  constructor(private _sourcedataService: SourcedataService) { }

  public getAbilityScore_Change = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_AbilityScore_Change();

    this._sourcedataService.getAbilityScores().subscribe(data => {
      modifier.abilityScoreOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getDefense_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Defense_Add();

    this._sourcedataService.getDamageTypes().subscribe(data => {
      modifier.damageTypeOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getHitPointMaximum_Change = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_HitPointMaximum_Change();

    observer.next(modifier);
  });

  public getInfluence_Condition_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Influence_Condition_Add();

    this._sourcedataService.getConditions().subscribe(data => {
      modifier.conditionOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getInfluence_Custom_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Influence_Custom_Add();

    observer.next(modifier);
  });

  public getInfluence_DamageType_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Influence_DamageType_Add();

    this._sourcedataService.getDamageTypes().subscribe(data => {
      modifier.damageTypeOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getProficiency_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Proficiency_Add();

    this._sourcedataService.getProficiencies().subscribe(data => {
      modifier.proficiencyOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getSense_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Sense_Add();

    this._sourcedataService.getSenses().subscribe(data => {
      modifier.senseOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getSkill_Proficient = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Skill_Proficient();

    this._sourcedataService.getSkills().subscribe(data => {
      modifier.skillOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getSpeed_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Speed_Add();

    this._sourcedataService.getSpeeds().subscribe(data => {
      modifier.speedOptions = data;

      observer.next(modifier);
    },
    error => {
      observer.error(error);
    });
  });

  public getSpell_Add = new Observable<SourceData_Modifier>((observer: any) => {
    let modifier = new SourceData_Modifier_Spell_Add();

    this._sourcedataService.getSpells().subscribe(data => {
      modifier.spellOptions = data;
    },
    error => {
      observer.error(error);
    });

    this._sourcedataService.getSpells().subscribe(data => {
      modifier.spellOptions = data;

      observer.next(modifier);
    },
    error => {
      throw Error("Could not retrieve data from the API");
    });
  });
}
