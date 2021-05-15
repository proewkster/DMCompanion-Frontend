import { DTO_NewCharacter_AbilityScore } from './../models/dto_newcharacter_abilityscore';
import { DTO_NewCharacter } from 'src/app/character/models/dto-newcharacter';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/character/services/character.service';
import { RaceService } from 'src/app/character/services/race.service';
import { DtoNewRace } from '../models/dto-new-race';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Pipe } from '@angular/core';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { map } from 'rxjs/operators';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit, AfterViewInit {

  // Form is shared for create and update, properties below are used for process identification
  createForm: boolean;
  id: string;

  newCharacter: DTO_NewCharacter;

  abilityScores: DTO_NewCharacter_AbilityScore[] = [];
  alignments = Object.values(Alignment).filter(value => typeof value != 'number');
  genders = Object.values(Gender).filter(value => typeof value != 'number');
  sizes = Object.values(Size).filter(value => typeof value != 'number');

  // Validation specific properties
  raceIsValid = false;

  constructor(private router: Router, private route: ActivatedRoute, private characterService: CharacterService, private raceService: RaceService, private _sourceDataService: SourcedataService,
    private _changeDetector: ChangeDetectorRef) { }

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
      this.newCharacter = new DTO_NewCharacter("Test",1,"somepicture",Alignment['Neutral (NN)'],Gender['Undetermined (X)'],"blue",6,Size.Medium,"none","black","pale",35,58,"something","Backstory goes here",null,[]);

      // Populate lists
      this.getAbilityScores();
    }
      
  }

  getAbilityScores = () => {
    // Get data from database
    this._sourceDataService.getAbilityScores().pipe(
      // Map each element to a Ability Score object and inject it in the property list
      map((data:SourceData_AbilityScore[]) => data.forEach(element => {
        this.newCharacter.abilityScores.push(new DTO_NewCharacter_AbilityScore(element.id, element.name, 10));
        return data;
      })))
      .subscribe();
  }

  onRaceValidationChanged = (result: boolean) => {
    this.raceIsValid = result;

    // Trigger change detection to prevent ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  save() {
    if (this.createForm) {
      // New character detected, contact API accordingly
      this.characterService.createNewCharacter(this.newCharacter)
        .subscribe(data => {
          this.router.navigateByUrl('/Characters');
        })
    }
    else {
      // this.characterService.updateCharacter(this.newCharacter)
      //   .subscribe(data => {
      //     this.router.navigateByUrl('/Characters');
      //   })
    }
  }
}
