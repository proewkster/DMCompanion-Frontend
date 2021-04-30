import { EditCastSpellComponent } from './edit-cast-spell/edit-cast-spell.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourceData_CastSpell } from 'src/app/admin/models/sourcedata/sourcedata_castspell';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteCastSpellComponent } from './delete-cast-spell/delete-cast-spell.component';
import { AddCastSpellComponent } from './add-cast-spell/add-cast-spell.component';

@Component({
  selector: 'app-cast-spell',
  templateUrl: './cast-spell.component.html',
  styleUrls: ['../../sourcedata.component.scss', './cast-spell.component.scss']
})
export class CastSpellComponent implements OnInit {

  sources: [SourceData_Source];
  castSpells: [SourceData_CastSpell];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _sourcedataService: SourcedataService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getSources();
    this.getCastSpells();
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

  private getCastSpells = () => {
    this._sourcedataService.getCastSpells()
      .subscribe(data => {
        this.castSpells = data;
      },
        error => {
          console.log("An error occurred while retrieving data from the server");
        })
  }

  public showEditCastSpellModal = (castSpell: SourceData_CastSpell) => {

    // Open modal
    const modalRef = this._modalService.open(EditCastSpellComponent, this.options);
    modalRef.componentInstance.title = "Edit CastSpell";
    modalRef.componentInstance.castSpell = castSpell;
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("CastSpell could not be updated");
        }
        else { // Process succeeded
          // Update succeeded, replace item in array
          let index = this.castSpells.indexOf(castSpell);

          this.castSpells[index] = data;

          // Show success message
          this._toastrService.success("CastSpell successfully updated");
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

  public showDeleteCastSpellModal = (castSpell: SourceData_CastSpell) => {

    // Open modal
    const modalRef = this._modalService.open(DeleteCastSpellComponent, this.options);
    modalRef.componentInstance.title = "Delete CastSpell";
    modalRef.componentInstance.castSpell = castSpell;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("CastSpell could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.castSpells.indexOf(castSpell);

          this.castSpells.splice(index, 1);

          // Show success message
          this._toastrService.success("CastSpell successfully removed");
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

  public showAddCastSpellModal = () => {

    // Open modal
    const modalRef = this._modalService.open(AddCastSpellComponent, this.options);
    modalRef.componentInstance.title = "Add CastSpell";
    modalRef.componentInstance.sources = this.sources;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("CastSpell could not be created");
        }
        else { // Process succeeded
          // Add new item to array
          this.castSpells.push(data);

          // Show success message
          this._toastrService.success("CastSpell successfully created");
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
