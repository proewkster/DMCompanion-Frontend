import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { Branching_Ability } from '../models/branching/branching_ability';
import { Branching_Feat } from '../models/branching/branching_feat';
import { Branching_Race } from '../models/branching/branching_race';

@Injectable({
  providedIn: 'root'
})
export class BranchingService {

  constructor(private _http: HttpService, private _httpClient: HttpClient) { }

  // Races

  public getRaces = () => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_RACE, ApiMethod.GET);
  }

  public getRace = (id: string) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_RACE, ApiMethod.GET, id);
  }

  public updateRace = (race: Branching_Race) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_RACE, ApiMethod.PUT, null, race);
  }

  // Feats

  public getFeats = () => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_FEAT, ApiMethod.GET);
  }

  public getFeat = (id: string) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_FEAT, ApiMethod.GET, id);
  }

  public updateFeat = (feat: Branching_Feat) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_FEAT, ApiMethod.PUT, null, feat);
  }

  // Abilities

  public getAbilities = () => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_ABILITY, ApiMethod.GET);
  }

  public getAbility = (id: string) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_ABILITY, ApiMethod.GET, id);
  }

  public updateAbility = (ability: Branching_Ability) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_ABILITY, ApiMethod.PUT, null, ability);
  }

  // Modifiers

  public getModifiers = () => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_MODIFIER, ApiMethod.GET);
  }

  public getModifier = (id: string) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_MODIFIER, ApiMethod.GET, id);
  }

  // Spells

  public getSpells = () => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_SPELL, ApiMethod.GET);
  }

  public getSpell = (id: string) => {
    return this._http.requestCall(ApiEndPoints.BRANCHING_SPELL, ApiMethod.GET, id);
  }
}
