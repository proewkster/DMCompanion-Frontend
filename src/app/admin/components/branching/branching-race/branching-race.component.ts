import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';
import { BranchingService } from 'src/app/admin/services/branching.service';

declare var $: any;

@Component({
  selector: 'app-branching-race',
  templateUrl: './branching-race.component.html',
  styleUrls: ['../branching.component.scss', './branching-race.component.scss']
})
export class BranchingRaceComponent implements OnInit {

  public races: Branching_Race[];
  public selectedRace: Branching_Race;
  public loadingData: boolean;
  public loadingComplete: boolean;

  constructor(private _branchingService: BranchingService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getRaces();
  }

  private getRaces = () => {
    this._branchingService.getRaces().subscribe(data => {
      this.races = data;

      // Refresh dropdown menu to display the options
      setTimeout(function() {
        $('.selectpicker').selectpicker('refresh');
      }, 1);
    },
    error => {
      console.log("An error occurred while retrieving data from the server");
    });
  }

  public onRaceSelection = (id: string) => {
    if (id !== "") {
      // Set loading parameters to display spinner
      this.loadingData = true;
      this.loadingComplete = false;

      // Get data for selected race
      this._branchingService.getRace(id).subscribe(data => {
        this.selectedRace = data;

        // Set loading parameters to remove spinner and display tree for selected race
        this.loadingData = false;
        this.loadingComplete = true;
      })
    }
    else {
      // Nothing selected, remove all conditional content
      this.loadingData = false;
      this.loadingComplete = false;
    }
  }

  public saveChanges = () => {
    this._branchingService.updateRace(this.selectedRace).subscribe(data => {
      // Refresh selected item with data form database
      this.selectedRace = data;

      // Display success message
      this._toastrService.success("Branch successfully saved");
    },
    error => {
      console.log(error);

      // Display error message
      this._toastrService.error("Branch could not be saved");
    });
  }
}
