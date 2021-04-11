import { HttpErrorResponse } from '@angular/common/http';
import { DeleteSourceComponent } from './delete-source/delete-source.component';
import { EditSourceComponent } from './edit-source/edit-source.component';
import { SourcedataService } from './../../../services/sourcedata.service';
import { SourceData_Source } from './../../../models/sourcedata/sourcedata_source';
import { AddSourceComponent } from './add-source/add-source.component';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-sourcedata-source',
  templateUrl: './source.component.html',
  styleUrls: ['../sourcedata.component.scss', './source.component.scss']
})
export class SourceComponent implements OnInit {

  sources: [SourceData_Source];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _modalService: NgbModal, private _sourcedataService: SourcedataService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
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

  public showEditSourceModal = (source: SourceData_Source) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSourceComponent, this.options);
    modalRef.componentInstance.title = "Edit Source";
    modalRef.componentInstance.source = source;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Source could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.sources.indexOf(source);

          this.sources[index] = data;

          // Show success message
          this._toastrService.success("Source successfully updated");
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

  public showDeleteSourceModal = (source: SourceData_Source) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSourceComponent, this.options);
    modalRef.componentInstance.title = "Delete Source";
    modalRef.componentInstance.source = source;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Source could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.sources.indexOf(source);
  
          this.sources.splice(index, 1);

          // Show success message
          this._toastrService.success("Source successfully removed");
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

  public showAddSourceModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddSourceComponent, this.options);
    modalRef.componentInstance.title = "Add Source";

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Source could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.sources.push(data);

          // Show success message
          this._toastrService.success("Source successfully created");
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
