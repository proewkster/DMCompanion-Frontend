import { SpellDuration } from './../../../../../enums/spell-duration.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourceData_Speed } from 'src/app/admin/models/sourcedata/sourcedata_speed';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { DeleteSpeedComponent } from './delete-speed/delete-speed.component';
import { EditSpeedComponent } from './edit-speed/edit-speed.component';
import { AddSpeedComponent } from './add-speed/add-speed.component';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['../../sourcedata.component.scss', './speed.component.scss']
})
export class SpeedComponent implements OnInit {

  sources: [SourceData_Source];
  speeds: [SourceData_Speed];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getSpeeds();
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

  private getSpeeds = () => {
    this._sourcedataService.getSpeeds()
      .subscribe(data => {
        this.speeds = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditSpeedModal = (speed: SourceData_Speed) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSpeedComponent, this.options);
    modalRef.componentInstance.title = "Edit Speed";
    modalRef.componentInstance.speed = speed;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Speed could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.speeds.indexOf(speed);

          this.speeds[index] = data;

          // Show success message
          this._toastrService.success("Speed successfully updated");
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

  public showDeleteSpeedModal = (speed: SourceData_Speed) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSpeedComponent, this.options);
    modalRef.componentInstance.title = "Delete Speed";
    modalRef.componentInstance.speed = speed;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Speed could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.speeds.indexOf(speed);
  
          this.speeds.splice(index, 1);

          // Show success message
          this._toastrService.success("Speed successfully removed");
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

  public showAddSpeedModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddSpeedComponent, this.options);
    modalRef.componentInstance.title = "Add Speed";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Speed could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.speeds.push(data);

          // Show success message
          this._toastrService.success("Speed successfully created");
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
