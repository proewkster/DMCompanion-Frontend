import { CustomValidators } from './../../../../../../shared/validators/CustomValidators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_CastSpell } from 'src/app/admin/models/sourcedata/dto_sourcedata_castspell';
import { SourceData_CastSpell } from 'src/app/admin/models/sourcedata/sourcedata_castspell';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AbilityType } from 'src/app/enums/ability-type.enum';
import { RestoreCondition } from 'src/app/enums/restore-condition.enum';

declare var $: any;

@Component({
  selector: 'app-add-cast-spell',
  templateUrl: './add-cast-spell.component.html',
  styleUrls: ['./add-cast-spell.component.scss']
})
export class AddCastSpellComponent implements OnInit, AfterViewInit {

  public addCastSpellForm: FormGroup;
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
    this.addCastSpellForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      type: [null, [Validators.required, Validators.maxLength(100)]],
      restoreCondition: [null, [Validators.required, Validators.maxLength(100)]],
      maxSlots: [1, [Validators.required, CustomValidators.range(0, 100)]],
      castingLevel: [0, [Validators.required, CustomValidators.range(0,9)]],
      sourceId: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addCastSpellForm.controls[controlName].invalid && (this.addCastSpellForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addCastSpellForm.controls[controlName].hasError(errorName);
  }

  // Submit updated CastSpell
  public createCastSpell = (addCastSpellValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addCastSpellForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addCastSpellValue };

    // Create instance of CastSpell model
    const castSpell: DTO_SourceData_CastSpell = {
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      restoreCondition: formValues.restoreCondition,
      maxSlots: formValues.maxSlots,
      castingLevel: formValues.castingLevel,
      sourceId: formValues.sourceId
    }

    // Create CastSpell in API
    this._sourcedataService.createCastSpell(castSpell)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}