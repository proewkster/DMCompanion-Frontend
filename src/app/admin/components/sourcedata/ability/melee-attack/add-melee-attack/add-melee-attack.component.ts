import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DTO_SourceData_MeleeAttack } from 'src/app/admin/models/sourcedata/dto_sourcedata_meleeattack';
import { SourceData_AttackDamage } from 'src/app/admin/models/sourcedata/sourcedata_attackdamage';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourceData_MeleeAttack } from 'src/app/admin/models/sourcedata/sourcedata_meleeattack';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AbilityType } from 'src/app/enums/ability-type.enum';
import { RestoreCondition } from 'src/app/enums/restore-condition.enum';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';
import { AddAttackDamageComponent } from '../../../damage/attack-damage/add-attack-damage/add-attack-damage.component';
import { DeleteAttackDamageComponent } from '../../../damage/attack-damage/delete-attack-damage/delete-attack-damage.component';
import { EditAttackDamageComponent } from '../../../damage/attack-damage/edit-attack-damage/edit-attack-damage.component';

declare var $: any;

@Component({
  selector: 'app-add-melee-attack',
  templateUrl: './add-melee-attack.component.html',
  styleUrls: ['../../../sourcedata.component.scss', './add-melee-attack.component.scss']
})

export class AddMeleeAttackComponent implements OnInit, AfterViewInit {

  public addMeleeAttackForm: FormGroup;
  public isSubmitted = false;
  public meleeAttack: SourceData_MeleeAttack;
  public sources: [SourceData_Source];
  public abilityTypes = AbilityType;
  public damageTypes: [SourceData_DamageType];
  public restoreConditions = RestoreCondition;
  public damageList: SourceData_AttackDamage[] = [];
  public keys = Object.keys;
  public title: string;

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal, 
    private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    this.getDamageTypes();

    // Designate form and configure validation
    this.addMeleeAttackForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      type: [null, [Validators.required, Validators.maxLength(100)]],
      restoreCondition: [null, [Validators.required, Validators.maxLength(100)]],
      maxSlots: [1, [Validators.required, CustomValidators.range(0, 100)]],
      range: [5, [Validators.required, CustomValidators.range(0, 1000)]],
      sourceId: [null, [Validators.required]]
    });
  }
  
  private getDamageTypes = () => {
    this._sourcedataService.getDamageTypes()
      .subscribe(data => {
        this.damageTypes = data;
      },
      error => {
        console.log("An error occurred while retrieving data from the server");
      });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addMeleeAttackForm.controls[controlName].invalid && (this.addMeleeAttackForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addMeleeAttackForm.controls[controlName].hasError(errorName);
  }

  // Submit updated MeleeAttack
  public createMeleeAttack = (addMeleeAttackValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addMeleeAttackForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addMeleeAttackValue };

    // Create instance of MeleeAttack model
    const meleeAttack: DTO_SourceData_MeleeAttack = {
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      restoreCondition: formValues.restoreCondition,
      maxSlots: formValues.maxSlots,
      range: formValues.range,
      sourceId: formValues.sourceId
    }

    // Add list of damage to model
    meleeAttack.damage = this.damageList;

    // Create MeleeAttack in API
    this._sourcedataService.createMeleeAttack(meleeAttack)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }

  public showEditDamageModal = (damage: SourceData_AttackDamage) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditAttackDamageComponent, this.options);
    modalRef.componentInstance.title = "Edit Damage";
    modalRef.componentInstance.damage = damage;
    modalRef.componentInstance.damageTypes = this.damageTypes;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Update succeeded, replace item in array
        let index = this.damageList.indexOf(damage);

        this.damageList[index] = data;

        // Show success message
        this._toastrService.success("Damage successfully updated");
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

  public showDeleteDamageModal = (damage: SourceData_AttackDamage) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteAttackDamageComponent, this.options);
    modalRef.componentInstance.title = "Delete Damage";
    modalRef.componentInstance.damage = damage;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Update succeeded, remove item from array
        let index = this.damageList.indexOf(data);

        this.damageList.splice(index, 1);

        // Show success message
        this._toastrService.success("Damage successfully removed");
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

  public showAddDamageModal = () => {
    
    // Open modal
    const modalRef = this._modalService.open(AddAttackDamageComponent, this.options);
    modalRef.componentInstance.title = "Add Damage";
    modalRef.componentInstance.damageTypes = this.damageTypes;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Add new object to list
        this.damageList.push(data);

        // Show success message
        this._toastrService.success("Damage successfully added");
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