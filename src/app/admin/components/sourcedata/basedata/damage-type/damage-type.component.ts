import { AddDamageTypeComponent } from './add-damage-type/add-damage-type.component';
import { DeleteDamageTypeComponent } from './delete-damage-type/delete-damage-type.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { EditDamageTypeComponent } from './edit-damage-type/edit-damage-type.component';

@Component({
  selector: 'app-damage-type',
  templateUrl: './damage-type.component.html',
  styleUrls: ['../../sourcedata.component.scss', './damage-type.component.scss']
})
export class DamageTypeComponent implements OnInit {

  sources: [SourceData_Source];
  damageTypes: [SourceData_DamageType];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getDamageTypes();
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

  private getDamageTypes = () => {
    this._sourcedataService.getDamageTypes()
      .subscribe(data => {
        this.damageTypes = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditDamageTypeModal = (damageType: SourceData_DamageType) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditDamageTypeComponent, this.options);
    modalRef.componentInstance.title = "Edit Damage Type";
    modalRef.componentInstance.damageType = damageType;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Damage Type could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.damageTypes.indexOf(damageType);

          this.damageTypes[index] = data;

          // Show success message
          this._toastrService.success("Damage Type successfully updated");
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

  public showDeleteDamageTypeModal = (damageType: SourceData_DamageType) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteDamageTypeComponent, this.options);
    modalRef.componentInstance.title = "Delete DamageType";
    modalRef.componentInstance.damageType = damageType;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Damage Type could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.damageTypes.indexOf(damageType);
  
          this.damageTypes.splice(index, 1);

          // Show success message
          this._toastrService.success("Damage Type successfully removed");
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

  public showAddDamageTypeModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddDamageTypeComponent, this.options);
    modalRef.componentInstance.title = "Add Damage Type";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Damage Type could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.damageTypes.push(data);

          // Show success message
          this._toastrService.success("Damage Type successfully created");
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
