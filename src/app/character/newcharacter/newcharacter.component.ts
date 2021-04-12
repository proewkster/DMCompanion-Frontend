import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Character } from 'src/app/models/character';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/character/services/character.service';
import { RaceService } from 'src/app/character/services/race.service';
import { AbilityscoreService } from 'src/app/character/services/abilityscore.service';
import { DtoNewABScores } from '../models/dto-new-abscores';
import { DtoNewcharacter } from '../models/dto-newcharacter';
import { DtoNewRace } from '../models/dto-new-race';
import { Race } from 'src/app/models/race';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit {

  constructor(private router: Router, private characterService: CharacterService, private raceService: RaceService, private abscoreService: AbilityscoreService) { }
  abilityScores: DtoNewABScores[] = [];
  races: Race[];
  //character: DtoNewcharacter = new DtoNewcharacter(null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  character: DtoNewcharacter;

  //selectedrace: DtoNewRace = new DtoNewRace(null)
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
      this.abilityScores.push(new DtoNewABScores(element, 13));
      //this.abScores.push(new DtoNewABScores(element, null));
    });
    this.character = new DtoNewcharacter("testchar", 1, "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/7/71/Llanowar_Elves.jpg/revision/latest/scale-to-width-down/250?cb=20190512202900",
      Alignment['1'], Gender["2"], "Blue", 15, Size["2"],
      "Flying Spaghetti Monster", "Brown", "Pale", 80, 50, "It's an Elf", "Born with the elfs", "No notes Available", this.abilityScores, this.races[0]);
  }
  save() {
    this.characterService.createNewCharacter(this.character)
      .subscribe(data => {
        this.router.navigateByUrl('/Characters');
      })
  }
}
