import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { BranchingService } from 'src/app/admin/services/branching.service';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'character-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {

  mainRaces: SourceData_Race[];

  selectedMainRace: SourceData_Race;
  selectedSubRace: SourceData_Race;

  fullMainRace: Branching_Race;

  constructor(private _sourcedataService: SourcedataService, private _branchingService: BranchingService) { }

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

  onMainRaceSelection = (raceId: string) => {
    
    // Get selected main race object
    this.selectedMainRace = this.mainRaces.find(x => x.id === raceId);

    // Clear selection of subrace
    this.selectedSubRace = null;

    // Refresh dropdown menu to display options
    setTimeout(function() {
      $('#subRaceSelector').selectpicker("refresh");
    }, 1);

    // Get branching data from database for selected race
    if (this.selectedMainRace != undefined){
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
