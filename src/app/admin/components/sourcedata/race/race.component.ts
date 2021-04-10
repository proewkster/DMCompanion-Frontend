import { RaceType } from './../../../../enums/race-type.enum';
import { EditRaceComponent } from './edit-race/edit-race.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteRaceComponent } from './delete-race/delete-race.component';
import { AddRaceComponent } from './add-race/add-race.component';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['../sourcedata.component.scss', './race.component.scss']
})
export class RaceComponent implements OnInit {

  sources: [SourceData_Source];
  races: [SourceData_Race];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getRaces();
  }

  private getSources = () => {
    this._sourcedataService.getSources()
      .subscribe(data => {
        this.sources = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      });
  }

  private getRaces = () => {
    this._sourcedataService.getMainRaces()
      .subscribe(data => {
        this.races = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditRaceModal = (race: SourceData_Race) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditRaceComponent, this.options);
    modalRef.componentInstance.title = "Edit Race";
    modalRef.componentInstance.race = race;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Race could not be updated");
        }
        else { // Process succeeded

          if (race.type === RaceType.Main) {
            // Main Race, replace in main table
            let index = this.races.indexOf(race);

            this.races[index] = data;
          }
          else {
            // Sub Race, replace in parent's collection
            let parentIndex = this.races.indexOf(this.races.find(x => x.id === race.parentId));
            let index = this.races[parentIndex].subRaces.indexOf(race);

            this.races[parentIndex].subRaces[index] = data;
          }

          // Show success message
          this._toastrService.success("Race successfully updated");
        }
      }
    },
    error => {
      console.log(error);
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  public showDeleteRaceModal = (race: SourceData_Race) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteRaceComponent, this.options);
    modalRef.componentInstance.title = "Delete Race";
    modalRef.componentInstance.race = race;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Race could not be removed");
        }
        else { // Process succeeded

          if (race.type === RaceType.Main) {
            // Main Race, remove from main table
            let index = this.races.indexOf(race);
              
            // Remove item from array    
            this.races.splice(index, 1);
          }
          else {
            // Sub Race, remove from parent's collection
            let parentIndex = this.races.indexOf(this.races.find(x => x.id === race.parentId));
            let index = this.races[parentIndex].subRaces.indexOf(race);

            // Remove item from array
            this.races[parentIndex].subRaces.splice(index, 1);
          }

          // Show success message
          this._toastrService.success("Race successfully removed");
        }
      }
    },
    error => {
      console.log(error);
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  public showAddSubRaceModal = (parent: SourceData_Race) => {

    // Open modal
    const modalRef = this._modalService.open(AddRaceComponent, this.options);
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.title = "Add SubRace for " + parent.name;
    modalRef.componentInstance.raceType = RaceType.Sub;
    modalRef.componentInstance.parentRace = parent;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Race could not be created");
        }
        else { // Process succeeded

          // Get parent race from array
          let index = this.races.indexOf(parent);

          // Add new item to array
          this.races[index].subRaces.push(data);

          // Show success message
          this._toastrService.success("Race successfully created");
        }
      }
    },
    error => {
      console.log(error);
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  public showAddRaceModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddRaceComponent, this.options);
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.title = "Add Main Race";
    modalRef.componentInstance.raceType = RaceType.Main;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Race could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.races.push(data);

          // Show success message
          this._toastrService.success("Race successfully created");
        }
      }
    },
    error => {
      console.log(error);
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }    
}
