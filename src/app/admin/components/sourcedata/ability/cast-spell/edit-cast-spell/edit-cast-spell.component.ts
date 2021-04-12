import { DTO_SourceData_CastSpell } from './../../../../../models/sourcedata/dto_sourcedata_castspell';
import { CustomValidators } from './../../../../../../shared/validators/CustomValidators';
import { RestoreCondition } from 'src/app/enums/restore-condition.enum';
import { SourceData_CastSpell } from './../../../../../models/sourcedata/sourcedata_castspell';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { AbilityType } from 'src/app/enums/ability-type.enum';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-edit-cast-spell',
  templateUrl: './edit-cast-spell.component.html',
  styleUrls: ['./edit-cast-spell.component.scss']
})
export class EditCastSpellComponent implements OnInit, AfterViewInit {

  public editCastSpellForm: FormGroup;
  public isSubmitted = false;
  public castSpell: SourceData_CastSpell;
  public sources: [SourceData_Source];
  public abilityTypes = AbilityType;
  public restoreConditions = RestoreCondition;
  public keys = Object.keys;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editCastSpellForm = this._formBuilder.group({
      id: [this.castSpell.id],
      name: [this.castSpell.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.castSpell.description, [Validators.required, Validators.maxLength(1000)]],
      type: [this.castSpell.type, [Validators.required, Validators.maxLength(100)]],
      restoreCondition: [this.castSpell.restoreCondition, [Validators.required, Validators.maxLength(100)]],
      maxSlots: [this.castSpell.maxSlots, [Validators.required, CustomValidators.range(0, 100)]],
      castingLevel: [this.castSpell.castingLevel, [Validators.required, CustomValidators.range(0,9)]],
      sourceId: [this.castSpell.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editCastSpellForm.controls[controlName].invalid && (this.editCastSpellForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editCastSpellForm.controls[controlName].hasError(errorName);
  }

  // Submit updated CastSpell
  public editCastSpell = (editCastSpellValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editCastSpellForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editCastSpellValue };

    // Create instance of CastSpell model
    const castSpell: DTO_SourceData_CastSpell = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      restoreCondition: formValues.restoreCondition,
      maxSlots: formValues.maxSlots,
      castingLevel: formValues.castingLevel,
      sourceId: formValues.sourceId
    }

    // Create CastSpell in API
    this._sourcedataService.updateCastSpell(castSpell)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
