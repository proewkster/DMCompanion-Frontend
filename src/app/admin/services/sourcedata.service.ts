import { DTO_SourceData_Feat } from './../models/sourcedata/dto_sourcedata_feat';
import { CustomEncoder } from './../../shared/helpers/custom-encoder';
import { HttpParams } from '@angular/common/http';
import { DTO_SourceData_Speed } from './../models/sourcedata/dto_sourcedata_speed';
import { DTO_SourceData_Proficiency } from './../models/sourcedata/dto_sourcedata_proficiency';
import { DTO_SourceData_MagicSchool } from './../models/sourcedata/dto_sourcedata_magicschool';
import { DTO_SourceData_DamageType } from './../models/sourcedata/dto_sourcedata_damagetype';
import { DTO_SourceData_Condition } from './../models/sourcedata/dto_sourcedata_condition';
import { DTO_SourceData_AbilityScore } from './../models/sourcedata/dto_sourcedata_abilityscore';
import { DTO_SourceData_Source } from './../models/sourcedata/dto_sourcedata_source';
import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { data } from 'jquery';
import { DTO_SourceData_Sense } from '../models/sourcedata/dto_sourcedata_sense';
import { DTO_SourceData_Skill } from '../models/sourcedata/dto_sourcedata_skill';
import { DTO_SourceData_Race } from '../models/sourcedata/dto_sourcedata_race';
import { DTO_SourceData_Ability } from '../models/sourcedata/dto_sourcedata_ability';
import { DTO_SourceData_MeleeAttack } from '../models/sourcedata/dto_sourcedata_meleeattack';
import { DTO_SourceData_RangedAttack } from '../models/sourcedata/dto_sourcedata_rangedattack';
import { DTO_SourceData_CastSpell } from '../models/sourcedata/dto_sourcedata_castspell';

@Injectable({
  providedIn: 'root'
})
export class SourcedataService {

  constructor(private _http: HttpService) { }

  // AbilityScores

  public getAbilityScores = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITYSCORE, ApiMethod.GET);
  }

  public getAbilityScore = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITYSCORE, ApiMethod.GET, id);
  }

  public createAbilityScore = (abilityScore: DTO_SourceData_AbilityScore) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITYSCORE, ApiMethod.POST, null, abilityScore);
  }

  public updateAbilityScore = (abilityScore: DTO_SourceData_AbilityScore) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITYSCORE, ApiMethod.PUT, null, abilityScore);
  }

  public deleteAbilityScore = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITYSCORE, ApiMethod.DELETE, id);
  }

  // Conditions

  public getConditions = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CONDITION, ApiMethod.GET);
  }

  public getCondition = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CONDITION, ApiMethod.GET, id);
  }

  public createCondition = (condition: DTO_SourceData_Condition) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CONDITION, ApiMethod.POST, null, condition);
  }

  public updateCondition = (condition: DTO_SourceData_Condition) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CONDITION, ApiMethod.PUT, null, condition);
  }

  public deleteCondition = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CONDITION, ApiMethod.DELETE, id);
  }

  // Damage Types

  public getDamageTypes = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_DAMAGETYPE, ApiMethod.GET);
  }

  public getDamageType = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_DAMAGETYPE, ApiMethod.GET, id);
  }

  public createDamageType = (damageType: DTO_SourceData_DamageType) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_DAMAGETYPE, ApiMethod.POST, null, damageType);
  }

  public updateDamageType = (damageType: DTO_SourceData_DamageType) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_DAMAGETYPE, ApiMethod.PUT, null, damageType);
  }

  public deleteDamageType = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_DAMAGETYPE, ApiMethod.DELETE, id);
  }

  // Magic Schools

  public getMagicSchools = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MAGICSCHOOL, ApiMethod.GET);
  }

  public getMagicSchool = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MAGICSCHOOL, ApiMethod.GET, id);
  }

  public createMagicSchool = (magicSchool: DTO_SourceData_MagicSchool) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MAGICSCHOOL, ApiMethod.POST, null, magicSchool);
  }

  public updateMagicSchool = (magicSchool: DTO_SourceData_MagicSchool) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MAGICSCHOOL, ApiMethod.PUT, null, magicSchool);
  }

  public deleteMagicSchool = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MAGICSCHOOL, ApiMethod.DELETE, id);
  }

  // Proficiencies

  public getProficiencies = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_PROFICIENCY, ApiMethod.GET);
  }

  public getProficiency = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_PROFICIENCY, ApiMethod.GET, id);
  }

  public createProficiency = (proficiency: DTO_SourceData_Proficiency) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_PROFICIENCY, ApiMethod.POST, null, proficiency);
  }

  public updateProficiency = (proficiency: DTO_SourceData_Proficiency) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_PROFICIENCY, ApiMethod.PUT, null, proficiency);
  }

  public deleteProficiency = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_PROFICIENCY, ApiMethod.DELETE, id);
  }

  // Senses

  public getSenses = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SENSE, ApiMethod.GET);
  }

  public getSense = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SENSE, ApiMethod.GET, id);
  }

  public createSense = (sense: DTO_SourceData_Sense) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SENSE, ApiMethod.POST, null, sense);
  }

  public updateSense = (sense: DTO_SourceData_Sense) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SENSE, ApiMethod.PUT, null, sense);
  }

  public deleteSense = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SENSE, ApiMethod.DELETE, id);
  }

  // Skills

  public getSkills = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SKILL, ApiMethod.GET);
  }

  public getSkill = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SKILL, ApiMethod.GET, id);
  }

  public createSkill = (skill: DTO_SourceData_Skill) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SKILL, ApiMethod.POST, null, skill);
  }

  public updateSkill = (skill: DTO_SourceData_Skill) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SKILL, ApiMethod.PUT, null, skill);
  }

  public deleteSkill = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SKILL, ApiMethod.DELETE, id);
  }

  // Speeds

  public getSpeeds = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SPEED, ApiMethod.GET);
  }

  public getSpeed = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SPEED, ApiMethod.GET, id);
  }

  public createSpeed = (speed: DTO_SourceData_Speed) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SPEED, ApiMethod.POST, null, speed);
  }

  public updateSpeed = (speed: DTO_SourceData_Speed) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SPEED, ApiMethod.PUT, null, speed);
  }

  public deleteSpeed = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SPEED, ApiMethod.DELETE, id);
  }

  // Races

  public getRaces = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.GET);
  }

  public getMainRaces = () => {
    // Build query parameter to add Type-filter to request
    let params = new HttpParams({ encoder: new CustomEncoder() })
      .set('type', 'Main');

    // Launch call
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.GET, null, { params: params });
  }

  public getRace = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.GET, id);
  }

  public createRace = (race: DTO_SourceData_Race) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.POST, null, race);
  }

  public updateRace = (race: DTO_SourceData_Race) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.PUT, null, race);
  }

  public deleteRace = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.DELETE, id);
  }

  // Feats

  public getFeats = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_FEAT, ApiMethod.GET);
  }

  public getFeat = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_FEAT, ApiMethod.GET, id);
  }

  public createFeat = (feat: DTO_SourceData_Feat) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_FEAT, ApiMethod.POST, null, feat);
  }

  public updateFeat = (feat: DTO_SourceData_Feat) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_FEAT, ApiMethod.PUT, null, feat);
  }

  public deleteFeat = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_FEAT, ApiMethod.DELETE, id);
  }

  // Abilities

  public getAbilities = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITY, ApiMethod.GET);
  }

  public getAbility = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITY, ApiMethod.GET, id);
  }

  public createAbility = (ability: DTO_SourceData_Ability) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITY, ApiMethod.POST, null, ability);
  }

  public updateAbility = (ability: DTO_SourceData_Ability) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITY, ApiMethod.PUT, null, ability);
  }

  public deleteAbility = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_ABILITY, ApiMethod.DELETE, id);
  }

  // MeleeAttacks

  public getMeleeAttacks = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MELEEATTACK, ApiMethod.GET);
  }

  public getMeleeAttack = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MELEEATTACK, ApiMethod.GET, id);
  }

  public createMeleeAttack = (meleeAttack: DTO_SourceData_MeleeAttack) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MELEEATTACK, ApiMethod.POST, null, meleeAttack);
  }

  public updateMeleeAttack = (meleeAttack: DTO_SourceData_MeleeAttack) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MELEEATTACK, ApiMethod.PUT, null, meleeAttack);
  }

  public deleteMeleeAttack = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_MELEEATTACK, ApiMethod.DELETE, id);
  }

  // RangedAttacks

  public getRangedAttacks = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RANGEDATTACK, ApiMethod.GET);
  }

  public getRangedAttack = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RANGEDATTACK, ApiMethod.GET, id);
  }

  public createRangedAttack = (rangedAttack: DTO_SourceData_RangedAttack) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RANGEDATTACK, ApiMethod.POST, null, rangedAttack);
  }

  public updateRangedAttack = (rangedAttack: DTO_SourceData_RangedAttack) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RANGEDATTACK, ApiMethod.PUT, null, rangedAttack);
  }

  public deleteRangedAttack = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_RANGEDATTACK, ApiMethod.DELETE, id);
  }

  // CastSpells

  public getCastSpells = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CASTSPELL, ApiMethod.GET);
  }

  public getCastSpell = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CASTSPELL, ApiMethod.GET, id);
  }

  public createCastSpell = (castSpell: DTO_SourceData_CastSpell) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CASTSPELL, ApiMethod.POST, null, castSpell);
  }

  public updateCastSpell = (castSpell: DTO_SourceData_CastSpell) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CASTSPELL, ApiMethod.PUT, null, castSpell);
  }

  public deleteCastSpell = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_CASTSPELL, ApiMethod.DELETE, id);
  }

  // Sources

  public getSources = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.GET);
  }

  public getSource = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.GET, id)
  }

  public createSource = (source: DTO_SourceData_Source) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.POST, null, source);
  }

  public updateSource = (source: DTO_SourceData_Source) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.PUT, null, source)
  }

  public deleteSource = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.DELETE, id)
  }
}
