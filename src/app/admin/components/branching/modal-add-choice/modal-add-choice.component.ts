import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { CustomValidators } from 'src/app/shared/validators/CustomValidators';

@Component({
  selector: 'app-modal-add-choice',
  templateUrl: './modal-add-choice.component.html',
  styleUrls: ['./modal-add-choice.component.scss']
})
export class ModalAddChoiceComponent implements OnInit {

  choice: Branching_Choice<any, any>;
  addChoiceForm: FormGroup;
  isSubmitted = false;
  title: string;

  constructor(private _formBuilder: FormBuilder, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    // Designate form and configure validation
    this.addChoiceForm = this._formBuilder.group({
      level: [this.choice.level || null, [Validators.required, CustomValidators.range(1, 20)]]
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addChoiceForm.controls[controlName].invalid && (this.addChoiceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addChoiceForm.controls[controlName].hasError(errorName);
  }

  // Create and return choice object
  createChoice = (addChoiceValue) => {
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addChoiceForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addChoiceValue };

    // Update Choice data
    this.choice.level = formValues.level;

    // Return data
    this._activeModal.close(this.choice);
  }

}
