import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Character } from 'src/app/models/character';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/services/character.service';
import { RaceService } from 'src/app/services/race.service';
import { AbilityscoreService } from 'src/app/services/abilityscore.service';
import { DtoNewABScores } from '../models/dto-new-abscores';
import { DtoNewcharacter } from '../models/dto-newcharacter';
import { DtoNewRace } from '../models/dto-new-race';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit {

  constructor(private router: Router, private characterService: CharacterService, private raceService: RaceService, private abscoreService: AbilityscoreService) { }
  character: DtoNewcharacter = new DtoNewcharacter(null, 1, null, null, null, null, null, null, null, null, null, null, null, null,null,null);
  abScores: DtoNewABScores[] = [];
  races: string[] = []
  selectedrace: DtoNewRace=new DtoNewRace(null)
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
      this.abScores.push(new DtoNewABScores(element, null));
    });
  }
  save() {
    console.log(this.character);
    console.log(this.selectedrace);
    console.log(this.abScores);
  }
}
