import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_Proficiency } from 'src/app/admin/models/sourcedata/sourcedata_proficiency';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddProficiencyComponent } from './add-proficiency/add-proficiency.component';
import { DeleteProficiencyComponent } from './delete-proficiency/delete-proficiency.component';
import { EditProficiencyComponent } from './edit-proficiency/edit-proficiency.component';

@Component({
  selector: 'app-proficiency',
  templateUrl: './proficiency.component.html',
  styleUrls: ['../../sourcedata.component.scss', './proficiency.component.scss']
})
export class ProficiencyComponent implements OnInit {

  sources: [SourceData_Source];
  proficiencies: [SourceData_Proficiency];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getProficiencies();
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

  private getProficiencies = () => {
    this._sourcedataService.getProficiencies()
      .subscribe(data => {
        this.proficiencies = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditProficiencyModal = (proficiency: SourceData_Proficiency) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditProficiencyComponent, this.options);
    modalRef.componentInstance.title = "Edit Proficiency";
    modalRef.componentInstance.proficiency = proficiency;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Proficiency could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.proficiencies.indexOf(proficiency);

          this.proficiencies[index] = data;

          // Show success message
          this._toastrService.success("Proficiency successfully updated");
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

  public showDeleteProficiencyModal = (proficiency: SourceData_Proficiency) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteProficiencyComponent, this.options);
    modalRef.componentInstance.title = "Delete Proficiency";
    modalRef.componentInstance.proficiency = proficiency;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Proficiency could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.proficiencies.indexOf(proficiency);
  
          this.proficiencies.splice(index, 1);

          // Show success message
          this._toastrService.success("Proficiency successfully removed");
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

  public showAddProficiencyModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddProficiencyComponent, this.options);
    modalRef.componentInstance.title = "Add Proficiency";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Proficiency could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.proficiencies.push(data);

          // Show success message
          this._toastrService.success("Proficiency successfully created");
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
