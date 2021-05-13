import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/character/services/character.service';
import { RaceService } from 'src/app/character/services/race.service';
import { AbilityscoreService } from 'src/app/character/services/abilityscore.service';
import { DtoNewABScores } from '../models/dto-new-abscores';
import { DTO_NewCharacter } from '../models/dto-newcharacter';
import { DtoNewRace } from '../models/dto-new-race';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute, private characterService: CharacterService, private raceService: RaceService, private abscoreService: AbilityscoreService,
    private _changeDetector: ChangeDetectorRef) { }

  //form shared voor update en create
  createForm: boolean;
  id: string;

  abilityScores: DtoNewABScores[] = [];
  mainRaces: DtoNewRace[] = [];
  subRaces: DtoNewRace[] = [];
  selectedRace: DtoNewRace = null;
  selectedSubrace: DtoNewRace = null;
  subracesForMainRace: DtoNewRace[] = [];
  //character: DtoNewcharacter = new DtoNewcharacter(null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  newCharacter: DTO_NewCharacter;

  // Validation specific properties
  raceIsValid = false;

  //selectedrace: DtoNewRace = new DtoNewRace(null)
  public alignments = Object.values(Alignment).filter(value => typeof value != 'number');
  public genders = Object.values(Gender).filter(value => typeof value != 'number');
  public sizes = Object.values(Size).filter(value => typeof value != 'number');

  public addCharacter() { }

  backToList(): void {
    this.router.navigateByUrl("/Characters");
  }

  // Drive tab controls
  next() {
    $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
  }

  ngAfterViewInit(): void {
    // Manually trigger change detection on view elements to check if classes have been changed through triggered validation of child elements
    // Not doing this causes an ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
    // Get id value from route parameter, if present
    this.id = this.route.snapshot.params['id'];

    // Set variable based on presence of ID parameter. This boolean variable is used to determine if a character is created or edited
    this.createForm = !this.id;

    // Create new instance of character model
    if (this.createForm) {
      this.newCharacter = new DTO_NewCharacter("Test",1,"somepicture",Alignment['Neutral (NN)'],Gender['Undetermined (X)'],"blue",6,Size.Medium,"","black","pale",35,58,"","Backstory goes here");
    }

    // Populate lists
    this.getAbilityScores();
      
  }

  getAbilityScores = () => {
    this.abscoreService.getAbilityScores().forEach(element => {
      this.abilityScores.push(new DtoNewABScores(element, 10));
      this.newCharacter.abilityScores = this.abilityScores;
    })
  }

  onRaceValidationChanged = (result: boolean) => {
    this.raceIsValid = result;

    // Trigger change detection to prevent ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  // loadraces() {
  //   this.raceService.getMainRaces().subscribe(x => {
  //     x.forEach(element => {
  //       this.mainRaces.push(element);
  //       if (element.subRaces.length == 0) {
  //         return;
  //       }
  //       element.subRaces.forEach(subrace => {
  //         this.subRaces.push(subrace);
  //       });

  //     });
  //     if (this.createForm) {
  //       this.abscoreService.getAbilityScores().forEach(element => {
  //         this.abilityScores.push(new DtoNewABScores(element, 13));
  //         //this.abScores.push(new DtoNewABScores(element, null));
  //       });
  //     }

  //     if (!this.createForm) {
  //       this.characterService.getCharacter(this.id)
  //         .subscribe(data => {
  //           this.character = data;
  //           this.selectedRace = this.character.races[0];
  //           if (this.character.races.length > 1) {
  //             this.selectedSubrace = this.character.races[1];
  //           }
  //           this.subRaces.forEach(element => {
  //             if (element.parentId == this.selectedRace.raceId) {
  //               this.subracesForMainRace.push(element);
  //             }
  //           });
  //           this.abilityScores = this.character.abilityScores;
  //         })
  //     }
  //     else {
  //       this.character = new DtoNewcharacter("testchar", 1, "https://cdn1.dotesports.com/wp-content/uploads/2020/09/01144749/Zendikar-Rising-Nissa.jpg",
  //         Alignment['1'], Gender["2"], "Blue", 15, Size["2"],
  //         "Flying Spaghetti Monster", "Brown", "Pale", 80, 50, "It's an Elf", "Born with the elfs", "No notes Available", this.abilityScores, [this.selectedRace, this.selectedSubrace]);
  //     }
  //   });
  // }

  // mainRaceChanged() {
  //   this.selectedSubrace = null;
  //   this.subracesForMainRace = [];
  //   this.subRaces.forEach(element => {
  //     if (element.parentId == this.selectedRace.id) {
  //       this.subracesForMainRace.push(element);
  //     }
  //   });
  // }

  //in UPDATE de juiste velden selecteren van de form
  // compareRace(race1: DtoNewRace, race2: DtoNewRace) {
  //   return race1 && race2 ? race1.name == race2.name : race1 == race2;
  // }
  // compareSubrace(race1: DtoNewRace, race2: DtoNewRace) {
  //   return race1 && race2 ? race1.name == race2.name : race1 == race2;
  // }

  save() {
    if (this.createForm) {
      // if (this.selectedSubrace == null) {
      //   this.character.races = [this.selectedRace]
      // }
      // else {
      //   this.character.races = [this.selectedRace, this.selectedSubrace]
      // }
      this.characterService.createNewCharacter(this.newCharacter)
        .subscribe(data => {
          this.router.navigateByUrl('/Characters');
        })
    }
    else {
      // this.character.races[0].raceId = this.selectedRace.id;
      // this.character.races[0].name = this.selectedRace.name;
      // this.character.races[0].description = this.selectedRace.description;
      // if (this.selectedSubrace != null) {
      //   if (this.character.races.length == 1) {
      //     this.character.races.push(this.selectedSubrace)
      //     this.character.races[1].id = null;
      //   }
      //   this.character.races[1].raceId = this.selectedSubrace.id;
      //   this.character.races[1].name = this.selectedSubrace.name;
      //   this.character.races[1].description = this.selectedSubrace.description;
      //   this.character.races[1].parentId = this.selectedSubrace.parentId;
      // }
      // else {
      //   this.character.races = this.character.races.slice(0, 1);
      // }
      this.characterService.updateCharacter(this.newCharacter)
        .subscribe(data => {
          this.router.navigateByUrl('/Characters');
        })
    }
  }
}
