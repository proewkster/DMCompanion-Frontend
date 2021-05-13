import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { BranchingService } from 'src/app/admin/services/branching.service';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { DTO_NewCharacter } from '../../models/dto-newcharacter';
import { DTO_NewCharacter_Race } from '../../models/dto_newcharacter_race';

declare var $: any;

@Component({
  selector: 'character-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit, AfterViewInit {

  // Character model, passed on by character creation page
  @Input() characterModel: DTO_NewCharacter;
  @Output() validationChanged = new EventEmitter<boolean>();

  mainRaces: SourceData_Race[];

  selectedMainRace: SourceData_Race;
  selectedSubRace: SourceData_Race;

  fullMainRace: Branching_Race;

  // Validation specific properties
  mainRaceIsValid = false;
  subRaceIsValid = false;

  constructor(private _sourcedataService: SourcedataService, private _branchingService: BranchingService, private _changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // Manually trigger change detection on view elements to check if classes have been changed through triggered validation of child elements
    // Not doing this causes an ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
    // Load main races from API
    this._sourcedataService.getMainRaces().subscribe(data => {
      if (data) {
        // Map data to property
        this.mainRaces = data;

        // Refresh dropdown menu to display options
        setTimeout(function() {
          $('#mainRaceSelector').selectpicker('refresh');
        }, 1);
      }
    },
    error => {
      console.log("An error occurred while loading data from the server");
    });
  }

  onMainRaceValidationChanged = (result: boolean) => {
    // Validate entire object and update choice based on result
    this.mainRaceIsValid = result;

    // Trigger validation of parent page
    this.validationChanged.emit(this.mainRaceIsValid && this.subRaceIsValid);
  }

  onSubRaceValidationChanged = (result: boolean) => {
    // Validate entire object and update choice based on result
    this.subRaceIsValid = result;

    // Trigger validation of parent page
    this.validationChanged.emit(this.mainRaceIsValid && this.subRaceIsValid);
  }

  onMainRaceSelection = (raceId: string) => {
    // Invalidate races
    this.mainRaceIsValid = false;
    this.subRaceIsValid = true; // Temporarily set to true until subrace processing is implemented

    // Remove all races from character, including subrace
    this.characterModel.races = [];
    
    // Get selected main race object
    this.selectedMainRace = this.mainRaces.find(x => x.id === raceId);

    // Clear selection of subrace
    this.selectedSubRace = null;

    // Refresh dropdown menu to display options
    setTimeout(function() {
      $('#subRaceSelector').selectpicker("refresh");
    }, 1);

    // Validate subrace if main race doesn't have subraces
    //this.subRaceIsValid = this.selectedMainRace.subRaces === undefined || this.selectedMainRace.subRaces?.length === 0;

    // Get branching data from database for selected race
    if (this.selectedMainRace != undefined){
      // Add race the character model
      this.characterModel.races.push(new DTO_NewCharacter_Race(this.selectedMainRace.id));

      this._branchingService.getRace(this.selectedMainRace.id).subscribe(data => {
        this.fullMainRace = data;
      });
    }
  }

  onSubRaceSelection = (raceId: string) => {
    
    // Get selected subrace object
    this.selectedSubRace = this.selectedMainRace.subRaces.find(x => x.id === raceId);
  }
}
