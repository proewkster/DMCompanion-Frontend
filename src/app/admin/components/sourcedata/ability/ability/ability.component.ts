import { SourceData_Ability } from './../../../../models/sourcedata/sourcedata_ability';
import { Component, OnInit } from '@angular/core';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { ToastrService } from 'ngx-toastr';
import { EditAbilityComponent } from './edit-ability/edit-ability.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteAbilityComponent } from './delete-ability/delete-ability.component';
import { AddAbilityComponent } from './add-ability/add-ability.component';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {

  sources: [SourceData_Source];
  abilities: [SourceData_Ability];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getAbilities();
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

  private getAbilities = () => {
    this._sourcedataService.getAbilities()
      .subscribe(data => {
        this.abilities = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditAbilityModal = (ability: SourceData_Ability) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditAbilityComponent, this.options);
    modalRef.componentInstance.title = "Edit Ability";
    modalRef.componentInstance.ability = ability;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Ability could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.abilities.indexOf(ability);

          this.abilities[index] = data;

          // Show success message
          this._toastrService.success("Ability successfully updated");
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

  public showDeleteAbilityModal = (ability: SourceData_Ability) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteAbilityComponent, this.options);
    modalRef.componentInstance.title = "Delete Ability";
    modalRef.componentInstance.ability = ability;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Ability could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.abilities.indexOf(ability);
  
          this.abilities.splice(index, 1);

          // Show success message
          this._toastrService.success("Ability successfully removed");
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

  public showAddAbilityModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddAbilityComponent, this.options);
    modalRef.componentInstance.title = "Add Ability";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Ability could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.abilities.push(data);

          // Show success message
          this._toastrService.success("Ability successfully created");
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
