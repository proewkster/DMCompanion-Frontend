import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_RangedAttack } from 'src/app/admin/models/sourcedata/sourcedata_rangedattack';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddRangedAttackComponent } from './add-ranged-attack/add-ranged-attack.component';
import { DeleteRangedAttackComponent } from './delete-ranged-attack/delete-ranged-attack.component';
import { EditRangedAttackComponent } from './edit-ranged-attack/edit-ranged-attack.component';

@Component({
  selector: 'app-ranged-attack',
  templateUrl: './ranged-attack.component.html',
  styleUrls: ['./ranged-attack.component.scss']
})
export class RangedAttackComponent implements OnInit {

  sources: [SourceData_Source];
  rangedAttacks: [SourceData_RangedAttack];

  private optionsLarge: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "lg"
  }

  private optionsSmall: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "lg"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getRangedAttacks();
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

  private getRangedAttacks = () => {
    this._sourcedataService.getRangedAttacks()
      .subscribe(data => {
        console.log(data);
        this.rangedAttacks = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditRangedAttackModal = (rangedAttack: SourceData_RangedAttack) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditRangedAttackComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Edit RangedAttack";
    modalRef.componentInstance.rangedAttack = rangedAttack;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("RangedAttack could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.rangedAttacks.indexOf(rangedAttack);

          this.rangedAttacks[index] = data;

          // Show success message
          this._toastrService.success("RangedAttack successfully updated");
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

  public showDeleteRangedAttackModal = (rangedAttack: SourceData_RangedAttack) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteRangedAttackComponent, this.optionsSmall);
    modalRef.componentInstance.title = "Delete RangedAttack";
    modalRef.componentInstance.rangedAttack = rangedAttack;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("RangedAttack could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.rangedAttacks.indexOf(rangedAttack);
  
          this.rangedAttacks.splice(index, 1);

          // Show success message
          this._toastrService.success("RangedAttack successfully removed");
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

  public showAddRangedAttackModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddRangedAttackComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Add RangedAttack";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("RangedAttack could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.rangedAttacks.push(data);

          // Show success message
          this._toastrService.success("RangedAttack successfully created");
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