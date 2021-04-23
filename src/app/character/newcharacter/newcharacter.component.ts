import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  mainRaces: DtoNewRace[] = [];
  subRaces: DtoNewRace[] = [];
  selectedRace: DtoNewRace = null;
  selectedSubrace: DtoNewRace = null;
  selectedRaces: DtoNewRace[] = [this.selectedRace, this.selectedSubrace];
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
    // this.races = this.raceService.getRaceNames();

    this.raceService.getMainRaces().subscribe(x => {
      x.forEach(element => {
        this.mainRaces.push(element);
        if (element.subRaces.length == 0) {
          return;
        }
        element.subRaces.forEach(subrace => {
          this.subRaces.push(subrace);
        });

      });
      // this.races = x;
      this.abscoreService.getAbilityScores().forEach(element => {
        this.abilityScores.push(new DtoNewABScores(element, 13));
        //this.abScores.push(new DtoNewABScores(element, null));
      });
      this.character = new DtoNewcharacter("testchar", 1, "https://cdn1.dotesports.com/wp-content/uploads/2020/09/01144749/Zendikar-Rising-Nissa.jpg",
        Alignment['1'], Gender["2"], "Blue", 15, Size["2"],
        "Flying Spaghetti Monster", "Brown", "Pale", 80, 50, "It's an Elf", "Born with the elfs", "No notes Available", this.abilityScores, this.selectedRaces);

    });


  }


  save() {
    this.character.races = [this.selectedRace, this.selectedSubrace]
    this.characterService.createNewCharacter(this.character)
      .subscribe(data => {
        this.router.navigateByUrl('/Characters');
      })
  }
}
