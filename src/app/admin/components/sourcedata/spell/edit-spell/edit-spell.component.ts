import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalOptions, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DTO_SourceData_Spell } from 'src/app/admin/models/sourcedata/dto_sourcedata_spell';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_AreaEffect } from 'src/app/admin/models/sourcedata/sourcedata_areaeffect';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/sourcedata_magicschool';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourceData_Spell } from 'src/app/admin/models/sourcedata/sourcedata_spell';
import { SourceData_SpellDamage } from 'src/app/admin/models/sourcedata/sourcedata_spelldamage';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { CastingTime } from 'src/app/enums/casting-time.enum';
import { SpellDuration } from 'src/app/enums/spell-duration.enum';
import { SpellRange } from 'src/app/enums/spell-range.enum';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';
import { AddAreaEffectComponent } from '../../area-effect/add-area-effect/add-area-effect.component';
import { DeleteAreaEffectComponent } from '../../area-effect/delete-area-effect/delete-area-effect.component';
import { EditAreaEffectComponent } from '../../area-effect/edit-area-effect/edit-area-effect.component';
import { AddSpellDamageComponent } from '../../damage/spell-damage/add-spell-damage/add-spell-damage.component';
import { DeleteSpellDamageComponent } from '../../damage/spell-damage/delete-spell-damage/delete-spell-damage.component';
import { EditSpellDamageComponent } from '../../damage/spell-damage/edit-spell-damage/edit-spell-damage.component';

declare var $: any;

@Component({
  selector: 'app-edit-spell',
  templateUrl: './edit-spell.component.html',
  styleUrls: ['../../sourcedata.component.scss', './edit-spell.component.scss']
})
export class EditSpellComponent implements OnInit, AfterViewInit {

  public editSpellForm: FormGroup;
  public isSubmitted = false;
  public spell: SourceData_Spell;
  public sources: [SourceData_Source];
  public abilityScores: [SourceData_AbilityScore];
  public magicSchools: [SourceData_MagicSchool];
  public damageTypes: [SourceData_DamageType];
  public castingTimes = CastingTime;
  public spellDurations = SpellDuration;  
  public spellRanges = SpellRange;
  public damageList: SourceData_SpellDamage[] = [];
  public areaEffect: SourceData_AreaEffect;
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
    this.editSpellForm = this._formBuilder.group({
      name: [this.spell.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.spell.description, [Validators.required, Validators.maxLength(1000)]],
      level: [this.spell.level, [Validators.required, CustomValidators.range(0, 9)]],
      castingTime: [this.spell.castingTime, [Validators.required]],
      duration: [this.spell.duration, [Validators.required]],
      concentration: [this.spell.concentration],
      components_Verbal: [this.spell.components_Verbal],
      components_Somatic: [this.spell.components_Somatic],
      components_Material: [this.spell.components_Material],
      components_Material_Description: [this.spell.components_Material_Description, [Validators.maxLength(1000)]],
      range: [this.spell.range, [Validators.required]],
      magicSchoolId: [this.spell.magicSchool?.id, [Validators.required]],
      abilityScoreId: [this.spell.savingThrowType?.id],
      sourceId: [this.spell.source?.id, [Validators.required]]
    });

    // Transfer damage to variable list
    // (clone damage list, simply assigning both arrays to eachother (arrayA = arrayB) will point both to same array in memory, with bad results on cancelled edit operations)
    this.spell.damage.forEach(damage => this.damageList.push(Object.assign({}, damage)));

    // Transfer areaEffect to variable list
    if (this.spell.areaEffect !== null) {
      this.areaEffect = {
        areaSize: this.spell.areaEffect.areaSize,
        areaType: this.spell.areaEffect.areaType 
      };
    }
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
    return this.editSpellForm.controls[controlName].invalid && (this.editSpellForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSpellForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Spell
  public editSpell = (editSpellValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editSpellForm.invalid) {
      console.log(this.editSpellForm);
      return;
    }

    // Get form values
    const formValues = { ...editSpellValue };

    // Create instance of Spell model
    const spell: DTO_SourceData_Spell = {
      name: formValues.name,
      description: formValues.description,
      level: formValues.level,
      castingTime: formValues.castingTime,
      duration: formValues.duration,
      concentration: formValues.concentration,
      components_Verbal: formValues.components_Verbal,
      components_Somatic: formValues.components_Somatic,
      components_Material: formValues.components_Material,
      components_Material_Description: formValues.components_Material_Description,
      range: formValues.range,
      magicSchoolId: formValues.magicSchoolId,
      abilityScoreId: formValues.abilityScoreId,
      sourceId: formValues.sourceId
    }

    // Clear Material_Description value if Material Components are not selected
    if (!spell.components_Material) {
      spell.components_Material_Description = null;
    }

    // Add list of damage to model
    spell.damage = this.damageList;

    // Add area effect to model
    spell.areaEffect = this.areaEffect;

    // Transfer ID value between models
    spell.id = this.spell.id;

    // Create Spell in API
    this._sourcedataService.updateSpell(spell)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }

  public showEditDamageModal = (damage: SourceData_SpellDamage) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditSpellDamageComponent, this.options);
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

  public showDeleteDamageModal = (damage: SourceData_SpellDamage) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteSpellDamageComponent, this.options);
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
    const modalRef = this._modalService.open(AddSpellDamageComponent, this.options);
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

  public showEditAreaEffectModal = (areaEffect: SourceData_AreaEffect) => {
    
    // Open modal
    const modalRef = this._modalService.open(EditAreaEffectComponent, this.options);
    modalRef.componentInstance.title = "Edit Area Effect";
    modalRef.componentInstance.areaEffect = areaEffect;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Update succeeded, replace item
        this.areaEffect = data;

        // Show success message
        this._toastrService.success("Area Effect successfully updated");
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

  public showDeleteAreaEffectModal = (areaEffect: SourceData_AreaEffect) => {
    
    // Open modal
    const modalRef = this._modalService.open(DeleteAreaEffectComponent, this.options);
    modalRef.componentInstance.title = "Delete Area Effect";
    modalRef.componentInstance.areaEffect = areaEffect;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Update succeeded, remove item
        this.areaEffect = null;

        // Show success message
        this._toastrService.success("Area Effect successfully removed");
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

  public showAddAreaEffectModal = () => {
    
    // Open modal
    const modalRef = this._modalService.open(AddAreaEffectComponent, this.options);
    modalRef.componentInstance.title = "Add Area Effect";
    modalRef.componentInstance.damageTypes = this.damageTypes;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {
        // Add new object to list
        this.areaEffect = data;

        // Show success message
        this._toastrService.success("Area Effect successfully added");
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