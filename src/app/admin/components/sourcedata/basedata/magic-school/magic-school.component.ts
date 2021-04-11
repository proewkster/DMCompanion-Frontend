import { EditMagicSchoolComponent } from './edit-magic-school/edit-magic-school.component';
import { SourceData_MagicSchool } from './../../../../models/sourcedata/sourcedata_magicschool';
import { Component, OnInit } from '@angular/core';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteMagicSchoolComponent } from './delete-magic-school/delete-magic-school.component';
import { AddMagicSchoolComponent } from './add-magic-school/add-magic-school.component';

@Component({
  selector: 'app-magic-school',
  templateUrl: './magic-school.component.html',
  styleUrls: ['../../sourcedata.component.scss', './magic-school.component.scss']
})
export class MagicSchoolComponent implements OnInit {

  sources: [SourceData_Source];
  magicSchools: [SourceData_MagicSchool];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getMagicSchools();
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

  private getMagicSchools = () => {
    this._sourcedataService.getMagicSchools()
      .subscribe(data => {
        this.magicSchools = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditMagicSchoolModal = (magicSchool: SourceData_MagicSchool) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditMagicSchoolComponent, this.options);
    modalRef.componentInstance.title = "Edit Magic School";
    modalRef.componentInstance.magicSchool = magicSchool;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Magic School could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.magicSchools.indexOf(magicSchool);

          this.magicSchools[index] = data;

          // Show success message
          this._toastrService.success("Magic School successfully updated");
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

  public showDeleteMagicSchoolModal = (magicSchool: SourceData_MagicSchool) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteMagicSchoolComponent, this.options);
    modalRef.componentInstance.title = "Delete Magic School";
    modalRef.componentInstance.magicSchool = magicSchool;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Magic School could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.magicSchools.indexOf(magicSchool);
  
          this.magicSchools.splice(index, 1);

          // Show success message
          this._toastrService.success("Magic School successfully removed");
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

  public showAddMagicSchoolModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddMagicSchoolComponent, this.options);
    modalRef.componentInstance.title = "Add Magic School";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Magic School could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.magicSchools.push(data);

          // Show success message
          this._toastrService.success("Magic School successfully created");
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
