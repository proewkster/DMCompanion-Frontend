import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_MeleeAttack } from 'src/app/admin/models/sourcedata/sourcedata_meleeattack';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddMeleeAttackComponent } from './add-melee-attack/add-melee-attack.component';
import { DeleteMeleeAttackComponent } from './delete-melee-attack/delete-melee-attack.component';
import { EditMeleeAttackComponent } from './edit-melee-attack/edit-melee-attack.component';

@Component({
  selector: 'app-melee-attack',
  templateUrl: './melee-attack.component.html',
  styleUrls: ['../../sourcedata.component.scss', './melee-attack.component.scss']
})
export class MeleeAttackComponent implements OnInit {

  sources: [SourceData_Source];
  meleeAttacks: [SourceData_MeleeAttack];

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
    this.getMeleeAttacks();
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

  private getMeleeAttacks = () => {
    this._sourcedataService.getMeleeAttacks()
      .subscribe(data => {
        console.log(data);
        this.meleeAttacks = data;
      },
        error => {
          console.log("An error occurred while retrieving data from the server");
        })
  }

  public showEditMeleeAttackModal = (meleeAttack: SourceData_MeleeAttack) => {

    // Open modal
    const modalRef = this._modalService.open(EditMeleeAttackComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Edit MeleeAttack";
    modalRef.componentInstance.meleeAttack = meleeAttack;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("MeleeAttack could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.meleeAttacks.indexOf(meleeAttack);

          this.meleeAttacks[index] = data;

          // Show success message
          this._toastrService.success("MeleeAttack successfully updated");
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

  public showDeleteMeleeAttackModal = (meleeAttack: SourceData_MeleeAttack) => {

    // Open modal
    const modalRef = this._modalService.open(DeleteMeleeAttackComponent, this.optionsSmall);
    modalRef.componentInstance.title = "Delete MeleeAttack";
    modalRef.componentInstance.meleeAttack = meleeAttack;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("MeleeAttack could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.meleeAttacks.indexOf(meleeAttack);

          this.meleeAttacks.splice(index, 1);

          // Show success message
          this._toastrService.success("MeleeAttack successfully removed");
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

  public showAddMeleeAttackModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddMeleeAttackComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Add MeleeAttack";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("MeleeAttack could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.meleeAttacks.push(data);

          // Show success message
          this._toastrService.success("MeleeAttack successfully created");
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