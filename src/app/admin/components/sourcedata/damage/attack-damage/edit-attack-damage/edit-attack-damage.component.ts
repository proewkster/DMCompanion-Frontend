import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AttackDamage } from 'src/app/admin/models/sourcedata/sourcedata_attackdamage';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { DiceType } from 'src/app/enums/dice-type.enum';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';

declare var $: any;

@Component({
  selector: 'app-edit-attack-damage',
  templateUrl: './edit-attack-damage.component.html',
  styleUrls: ['./edit-attack-damage.component.scss']
})
export class EditAttackDamageComponent implements OnInit, AfterViewInit {

  public editDamageForm: FormGroup;
  public isSubmitted = false;
  public title: string;
  public damage: SourceData_AttackDamage;
  public damageTypes: [SourceData_DamageType];
  public diceTypes = DiceType;
  public keys = Object.keys;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editDamageForm = this._formBuilder.group({
      diceCount: [this.damage.diceCount, [Validators.required, CustomValidators.range(1, 100)]],
      diceType: [this.damage.diceType, [Validators.required]],
      damageTypeId: [this.damage.damageType.id, [Validators.required]]
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editDamageForm.controls[controlName].invalid && (this.editDamageForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editDamageForm.controls[controlName].hasError(errorName);
  }

  // Update Damage object
  public editDamage = (editDamageValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editDamageForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editDamageValue };

    // Get selected DamageType object
    let damageType = this.damageTypes.find(x => x.id == formValues.damageTypeId);

    // Create instance of AttackDamage model
    const damage: SourceData_AttackDamage = {
      id: this.damage.id ? this.damage.id : null,
      diceCount: formValues.diceCount,
      diceType: formValues.diceType,
      damageTypeId: formValues.damageTypeId,
      damageType: damageType
    }

    // Return model to calling instance
    this._activeModal.close(damage);
  }
}
