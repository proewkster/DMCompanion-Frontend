import { EditSenseComponent } from './edit-sense/edit-sense.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_Sense } from 'src/app/admin/models/sourcedata/sourcedata_sense';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteSenseComponent } from './delete-sense/delete-sense.component';
import { AddSenseComponent } from './add-sense/add-sense.component';

@Component({
  selector: 'app-sense',
  templateUrl: './sense.component.html',
  styleUrls: ['../../sourcedata.component.scss', './sense.component.scss']
})
export class SenseComponent implements OnInit {

  sources: [SourceData_Source];
  senses: [SourceData_Sense];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getSenses();
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

  private getSenses = () => {
    this._sourcedataService.getSenses()
      .subscribe(data => {
        this.senses = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditSenseModal = (sense: SourceData_Sense) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSenseComponent, this.options);
    modalRef.componentInstance.title = "Edit Sense";
    modalRef.componentInstance.sense = sense;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Sense could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.senses.indexOf(sense);

          this.senses[index] = data;

          // Show success message
          this._toastrService.success("Sense successfully updated");
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

  public showDeleteSenseModal = (sense: SourceData_Sense) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSenseComponent, this.options);
    modalRef.componentInstance.title = "Delete Sense";
    modalRef.componentInstance.sense = sense;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Sense could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.senses.indexOf(sense);
  
          this.senses.splice(index, 1);

          // Show success message
          this._toastrService.success("Sense successfully removed");
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

  public showAddSenseModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddSenseComponent, this.options);
    modalRef.componentInstance.title = "Add Sense";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Sense could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.senses.push(data);

          // Show success message
          this._toastrService.success("Sense successfully created");
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
