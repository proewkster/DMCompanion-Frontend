import { AddAbilityScoreComponent } from './add-ability-score/add-ability-score.component';
import { EditAbilityScoreComponent } from './edit-ability-score/edit-ability-score.component';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Source } from './../../../../models/sourcedata/sourcedata_source';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DeleteAbilityScoreComponent } from './delete-ability-score/delete-ability-score.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-ability-score',
  templateUrl: './ability-score.component.html',
  styleUrls: ['./ability-score.component.scss']
})
export class AbilityScoreComponent implements OnInit {

  sources: [SourceData_Source];
  abilityScores: [SourceData_AbilityScore];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getAbilityScores();
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

  private getAbilityScores = () => {
    this._sourcedataService.getAbilityScores()
      .subscribe(data => {
        this.abilityScores = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
  }

  public showEditAbilityScoreModal = (abilityScore: SourceData_AbilityScore) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditAbilityScoreComponent, this.options);
    modalRef.componentInstance.title = "Edit Ability Score";
    modalRef.componentInstance.abilityScore = abilityScore;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Abilty Score could not be created");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.abilityScores.indexOf(abilityScore);

          this.abilityScores[index] = data;

          // Show success message
          this._toastrService.success("Ability Score successfully updated");
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

  public showDeleteAbilityScoreModal = (abilityScore: SourceData_AbilityScore) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteAbilityScoreComponent, this.options);
    modalRef.componentInstance.title = "Delete Ability Score";
    modalRef.componentInstance.abilityScore = abilityScore;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Ability Score could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.abilityScores.indexOf(abilityScore);
  
          this.abilityScores.splice(index, 1);

          // Show success message
          this._toastrService.success("Ability Score successfully removed");
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

  public showAddAbilityScoreModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddAbilityScoreComponent, this.options);
    modalRef.componentInstance.title = "Add Ability Score";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Ability Score could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.abilityScores.push(data);

          // Show success message
          this._toastrService.success("Ability Score successfully created");
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
