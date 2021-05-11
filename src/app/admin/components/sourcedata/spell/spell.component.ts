import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/sourcedata_magicschool';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourceData_Spell } from 'src/app/admin/models/sourcedata/sourcedata_spell';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddSpellComponent } from './add-spell/add-spell.component';
import { DeleteSpellComponent } from './delete-spell/delete-spell.component';
import { EditSpellComponent } from './edit-spell/edit-spell.component';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['../sourcedata.component.scss', './spell.component.scss']
})
export class SpellComponent implements OnInit {

  sources: [SourceData_Source];
  abilityScores: [SourceData_AbilityScore];
  magicSchools: [SourceData_MagicSchool];
  spells: [SourceData_Spell];

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
    size: "sm"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getAbilityScores();
    this.getMagicSchools();
    this.getSpells();
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
      });
  }

  private getMagicSchools = () => {
    this._sourcedataService.getMagicSchools()
      .subscribe(data => {
        this.magicSchools = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      });
  }

  private getSpells = () => {
    this._sourcedataService.getSpells()
      .subscribe(data => {
        this.spells = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      });
  }

  public showEditSpellModal = (spell: SourceData_Spell) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSpellComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Edit Spell";
    modalRef.componentInstance.spell = spell;
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.abilityScores = this.abilityScores;
    modalRef.componentInstance.magicSchools = this.magicSchools;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Spell could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.spells.indexOf(spell);

          this.spells[index] = data;

          // Show success message
          this._toastrService.success("Spell successfully updated");
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

  public showDeleteSpellModal = (spell: SourceData_Spell) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSpellComponent, this.optionsSmall);
    modalRef.componentInstance.title = "Delete Spell";
    modalRef.componentInstance.spell = spell;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Spell could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.spells.indexOf(spell);
  
          this.spells.splice(index, 1);

          // Show success message
          this._toastrService.success("Spell successfully removed");
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

  public showAddSpellModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddSpellComponent, this.optionsLarge);
    modalRef.componentInstance.title = "Add Spell";
    modalRef.componentInstance.sources = this.sources;
    modalRef.componentInstance.abilityScores = this.abilityScores;
    modalRef.componentInstance.magicSchools = this.magicSchools;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Spell could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.spells.push(data);

          // Show success message
          this._toastrService.success("Spell successfully created");
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
