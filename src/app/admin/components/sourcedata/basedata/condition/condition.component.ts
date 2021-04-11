import { DeleteConditionComponent } from './delete-condition/delete-condition.component';
import { EditConditionComponent } from './edit-condition/edit-condition.component';
import { SourceData_Condition } from './../../../../models/sourcedata/sourcedata_condition';
import { Component, OnInit } from '@angular/core';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AddConditionComponent } from './add-condition/add-condition.component';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['../../sourcedata.component.scss', './condition.component.scss']
})
export class ConditionComponent implements OnInit {

  sources: [SourceData_Source];
  conditions: [SourceData_Condition];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getConditions();
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

  private getConditions = () => {
    this._sourcedataService.getConditions()
      .subscribe(data => {
        this.conditions = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditConditionModal = (condition: SourceData_Condition) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditConditionComponent, this.options);
    modalRef.componentInstance.title = "Edit Condition";
    modalRef.componentInstance.condition = condition;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Condition could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.conditions.indexOf(condition);

          this.conditions[index] = data;

          // Show success message
          this._toastrService.success("Condition successfully updated");
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

  public showDeleteConditionModal = (condition: SourceData_Condition) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteConditionComponent, this.options);
    modalRef.componentInstance.title = "Delete Condition";
    modalRef.componentInstance.condition = condition;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Condition could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.conditions.indexOf(condition);
  
          this.conditions.splice(index, 1);

          // Show success message
          this._toastrService.success("Condition successfully removed");
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

  public showAddConditionModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddConditionComponent, this.options);
    modalRef.componentInstance.title = "Add Condition";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Condition could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.conditions.push(data);

          // Show success message
          this._toastrService.success("Condition successfully created");
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
