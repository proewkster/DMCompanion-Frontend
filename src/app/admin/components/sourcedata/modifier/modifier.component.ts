import { SourceData_Modifier } from './../../../models/sourcedata/sourcedata_modifier';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AddModifierComponent } from './add-modifier/add-modifier.component';
import { GetModifierTypeComponent } from './get-modifier-type/get-modifier-type.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ModifierDiscriminator } from 'src/app/enums/modifier-discriminator.enum';
import { Observable } from 'rxjs';
import { ModifierTypeService } from 'src/app/admin/services/modifier-type.service';
import { EditModifierComponent } from './edit-modifier/edit-modifier.component';
import { DeleteModifierComponent } from './delete-modifier/delete-modifier.component';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {

  modifiers: [SourceData_Modifier];

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _modalService: NgbModal, private _sourcedataService: SourcedataService, private _toastrService: ToastrService,
              private _modifierTypeService: ModifierTypeService) { }

  ngOnInit(): void {
    this.getModifiers();
  }

  private getModifiers = () => {
    this._sourcedataService.getModifiers()
      .subscribe(data => {
        this.modifiers = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      });
  }

  public showEditModifierModal = (modifier: SourceData_Modifier) => {

    // Get derived class of selected modifier and create instance of correct subclass
    this.getDerivedModifierType(modifier.discriminator).subscribe(data => {
      // Merge data into received model
      data = Object.assign(data, modifier);

      // Open modal and await user input
      this.openModal(EditModifierComponent, "Edit Modifier", data).then(data => {
        if (data) {
          if (data instanceof HttpErrorResponse) {
            // Show error message
            this._toastrService.error("Modifier could not be updated");
          }
          else {
            // Update succeeded, replace item in array
            let index = this.modifiers.indexOf(modifier);

            this.modifiers[index] = data;

            // Show success message
            this._toastrService.success("Modifier successfully updated");
          }
        }
      },
      error => {
        this.handleModalError(error);
      });
    },
    error => {
      console.log("Couldn't retrieve modifier type based on provided data");

      this._toastrService.error("An error occurred while editing the modifier");
    });
  }

  public showDeleteModifierModal = (modifier: SourceData_Modifier) => {

    // Open modal and await result
    this.openModal(DeleteModifierComponent, "Delete Modifier", modifier).then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Modifier could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.modifiers.indexOf(modifier);
  
          this.modifiers.splice(index, 1);

          // Show success message
          this._toastrService.success("Modifier successfully removed");
        }
      }
    },
    error => {
      this.handleModalError(error);
    });
  }

  public showAddModifierModal = () => {

    // Determine Modifier type
    this.openModal(GetModifierTypeComponent, "Select Modifier Type", null).then(modifier => {

      // Open user input modal and wait for result
      this.openModal(AddModifierComponent, "Add Modifier", modifier).then(data => {
        if (data) {
          if (data instanceof HttpErrorResponse) {
            // Show error message
            this._toastrService.error("Modifier could not be created");
          }
          else {
            // Add new item to array
            this.modifiers.push(data);

            // Show success message
            this._toastrService.success("Modifier successfully created");
          }
        }
      },
      error => {
        this.handleModalError(error);
      });
    },
    error => {
      this.handleModalError(error);
    });
  }

  private openModal = (component: any, title: string, modifier: SourceData_Modifier): Promise<any> => {
    // Open the modal component and set modal parameters
    const modalRef = this._modalService.open(component, this.options);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.modifier = modifier;

    // Listen for modal response
    return modalRef.result;
  }

  private handleModalError = (error: any) => {
    if (error === "Close click" || error === "Cross click") {
      // Modal dismissed, no specific action
      // Error catch is needed to suppress errors in UI
    }
    else {
      console.log(error);
    }
  }

  private getDerivedModifierType = (discriminator: ModifierDiscriminator): Observable<SourceData_Modifier> => {
    
    // Initialize return value
    let result = null;

    // Get instance of derived modifier class based on discriminator
    switch (discriminator) {
      case ModifierDiscriminator.AbilityScore_Change:
        result = this._modifierTypeService.getAbilityScore_Change;
        break;
      case ModifierDiscriminator.Defense_Add:
        result = this._modifierTypeService.getDefense_Add;
        break;
      case ModifierDiscriminator.HitPointMaximum_Change:
        result = this._modifierTypeService.getHitPointMaximum_Change;
        break;
      case ModifierDiscriminator.Influence_Condition_Add:
        result = this._modifierTypeService.getInfluence_Condition_Add;
        break;
      case ModifierDiscriminator.Influence_Custom_Add:
        result = this._modifierTypeService.getInfluence_Custom_Add;
        break;
      case ModifierDiscriminator.Influence_DamageType_Add:
        result = this._modifierTypeService.getInfluence_DamageType_Add;
        break;
      case ModifierDiscriminator.Proficiency_Add:
        result = this._modifierTypeService.getProficiency_Add;
        break;
      case ModifierDiscriminator.Sense_Add:
        result = this._modifierTypeService.getSense_Add;
        break;
      case ModifierDiscriminator.Skill_Proficient:
        result = this._modifierTypeService.getSkill_Proficient;
        break;
      case ModifierDiscriminator.Speed_Add:
        result = this._modifierTypeService.getSpeed_Add;
        break;
      case ModifierDiscriminator.Spell_Add:
        result = this._modifierTypeService.getSpell_Add;
        break;
      default:
        console.log("Invalid Modifier Type Discriminator detected while editing the modifier");
        break;
    }

    return result;
  }

}
