import { CustomValidators } from 'src/app/shared/validators/CustomValidators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiceType } from 'src/app/enums/dice-type.enum';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourceData_AttackDamage } from 'src/app/admin/models/sourcedata/sourcedata_attackdamage';

declare var $: any;

@Component({
  selector: 'app-add-attack-damage',
  templateUrl: './add-attack-damage.component.html',
  styleUrls: ['./add-attack-damage.component.scss']
})
export class AddAttackDamageComponent implements OnInit, AfterViewInit {

  public addDamageForm: FormGroup;
  public isSubmitted = false;
  public title: string;
  public damageTypes: SourceData_DamageType[];
  public diceTypes = DiceType;
  public keys = Object.keys;

  constructor(private _formBuilder: FormBuilder, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    // Designate form and configure validation
    this.addDamageForm = this._formBuilder.group({
      diceCount: [1, [Validators.required, CustomValidators.range(1, 100)]],
      diceType: [null, [Validators.required]],
      damageTypeId: [null, [Validators.required]]
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addDamageForm.controls[controlName].invalid && (this.addDamageForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addDamageForm.controls[controlName].hasError(errorName);
  }

  // Create Damage object
  public createDamage = (addDamageValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addDamageForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addDamageValue };

    // Get selected DamageType object
    let damageType = this.damageTypes.find(x => x.id == formValues.damageTypeId);

    // Create instance of AttackDamage model
    const damage: SourceData_AttackDamage = {
      diceCount: formValues.diceCount,
      diceType: formValues.diceType,
      damageTypeId: formValues.damageTypeId,
      damageType: damageType
    }

    // Return model to calling instance
    this._activeModal.close(damage);
  }
}
