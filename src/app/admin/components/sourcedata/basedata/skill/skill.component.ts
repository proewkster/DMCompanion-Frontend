import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_Skill } from 'src/app/admin/models/sourcedata/sourcedata_skill';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { DeleteSkillComponent } from './delete-skill/delete-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  sources: [SourceData_Source];
  skills: [SourceData_Skill];
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
    this.getSkills();
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

  private getSkills = () => {
    this._sourcedataService.getSkills()
      .subscribe(data => {
        this.skills = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      })
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

  public showEditSkillModal = (skill: SourceData_Skill) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSkillComponent, this.options);
    modalRef.componentInstance.title = "Edit Skill";
    modalRef.componentInstance.skill = skill;
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.abilityScores = this.abilityScores;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Skill could not be created");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.skills.indexOf(skill);

          this.skills[index] = data;

          // Show success message
          this._toastrService.success("Skill successfully updated");
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

  public showDeleteSkillModal = (skill: SourceData_Skill) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSkillComponent, this.options);
    modalRef.componentInstance.title = "Delete Skill";
    modalRef.componentInstance.skill = skill;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Skill could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.skills.indexOf(skill);
  
          this.skills.splice(index, 1);

          // Show success message
          this._toastrService.success("Skill successfully removed");
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

  public showAddSkillModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddSkillComponent, this.options);
    modalRef.componentInstance.title = "Add Skill";
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.abilityScores = this.abilityScores;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Skill could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.skills.push(data);

          // Show success message
          this._toastrService.success("Skill successfully created");
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
