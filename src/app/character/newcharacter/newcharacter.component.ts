import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Character } from 'src/app/models/character';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/services/character.service';
import { AbilityScore } from 'src/app/models/ability-score';
import { Personality } from 'src/app/models/personality';
import { RaceService } from 'src/app/services/race.service';
import { AbilityscoreService } from 'src/app/services/abilityscore.service';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit {

  constructor(private router: Router, private characterService: CharacterService, private raceService: RaceService, private abscoreService: AbilityscoreService) { }
  character: Character = new Character("", 1, "", true, null, null, null, null, null, null, null, null, null, null, null, null, "", null, null, "", "", "", null, null, "", "", "", null, null);
  //abScore: AbilityScore = new AbilityScore(null,null,null,null,null,null,null,null,null,null,null);
  abScores: AbilityScore[] = [];
  personality: Personality = new Personality(0, "", "");
  races: string[] = []
  selectedrace: string = "";
  public alignments = Object.values(Alignment).filter(value => typeof value != 'number');
  public genders = Object.values(Gender).filter(value => typeof value != 'number');
  public sizes = Object.values(Size).filter(value => typeof value != 'number');
  public addCharacter() {

  }
  backToList(): void {
    this.router.navigateByUrl("/Characters");
  }

  next() {
    $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
  }



  ngOnInit(): void {
    //this.raceService.getRaceNames().subscribe(x => this.races = x);
    this.races = this.raceService.getRaceNames();
    this.abscoreService.getAbilityScores().forEach(element => {
      this.abScores.push(new AbilityScore(null, element, null, null, null, null, null, null, null, null, null));
    });
  }
  save() {
    console.log(this.character);
    console.log(this.selectedrace);
    console.log(this.abScores);
    console.log(this.personality);
  }
}
