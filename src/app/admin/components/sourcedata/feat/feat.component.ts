import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_Feat } from 'src/app/admin/models/sourcedata/sourcedata_feat';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddFeatComponent } from './add-feat/add-feat.component';
import { DeleteFeatComponent } from './delete-feat/delete-feat.component';
import { EditFeatComponent } from './edit-feat/edit-feat.component';

@Component({
  selector: 'app-feat',
  templateUrl: './feat.component.html',
  styleUrls: ['./feat.component.scss']
})
export class FeatComponent implements OnInit {

  sources: [SourceData_Source];
  feats: [SourceData_Feat];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getFeats();
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

  private getFeats = () => {
    this._sourcedataService.getFeats()
      .subscribe(data => {
        this.feats = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditFeatModal = (feat: SourceData_Feat) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditFeatComponent, this.options);
    modalRef.componentInstance.title = "Edit Feat";
    modalRef.componentInstance.feat = feat;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Feat could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.feats.indexOf(feat);

          this.feats[index] = data;

          // Show success message
          this._toastrService.success("Feat successfully updated");
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

  public showDeleteFeatModal = (feat: SourceData_Feat) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteFeatComponent, this.options);
    modalRef.componentInstance.title = "Delete Feat";
    modalRef.componentInstance.feat = feat;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Feat could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.feats.indexOf(feat);
  
          this.feats.splice(index, 1);

          // Show success message
          this._toastrService.success("Feat successfully removed");
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

  public showAddFeatModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddFeatComponent, this.options);
    modalRef.componentInstance.title = "Add Feat";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Feat could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.feats.push(data);

          // Show success message
          this._toastrService.success("Feat successfully created");
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
