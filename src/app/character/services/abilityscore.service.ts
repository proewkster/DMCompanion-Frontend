import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbilityscoreService {
  //ophalen uit DB
  abilityscores: string[] = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
  constructor() { }
  getAbilityScores() {
    return this.abilityscores;
  }
}
