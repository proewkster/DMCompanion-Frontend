import { BranchingChoiceOptions } from './../../../../enums/branching-choice-option.enum';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchingService } from 'src/app/admin/services/branching.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { BranchingFeatValidationErrors } from 'src/app/enums/branching-feat-validation-errors.enum';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';

declare var $: any;

@Component({
  selector: 'app-modal-add-option',
  templateUrl: './modal-add-option.component.html',
  styleUrls: ['./modal-add-option.component.scss']
})
export class ModalAddOptionComponent implements OnInit {

  memberType: BranchingChoiceOptions;
  choiceContainer: Branching_Choice<any,any>;
  title: string;
  label: string;
  options: any[];
  selectedOption: any;
  addOptionForm: FormGroup;
  isSubmitted = false;

  constructor(private _branchingService: BranchingService, private _activeModal: NgbActiveModal, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Get data based on the provided option type
    this.getRelevantData().subscribe(data => {
      // Populate options property for dropdown selection menu with the retrieved data
      this.options = data;

      // Refresh dropdown menu to display the options
      setTimeout(function() {
        $('.selectpicker').selectpicker('refresh');
      }, 1);
    },
    error => {
      console.log("An error occurred while retrieving data from the server");
      this._activeModal.dismiss("Data could not be retrieved");
    });

    // Designate form and configure validation
    this.addOptionForm = this._formBuilder.group({
      option: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addOptionForm.controls[controlName].invalid && (this.addOptionForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addOptionForm.controls[controlName].hasError(errorName);
  }

  // Process selection
  createOption = () => {
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addOptionForm.invalid) {
      return;
    }

    // Get full branch for selected option
    this.getFullBranchForSelection().subscribe(data => {
      this.selectedOption = data;

      // Validata SubFeat data before adding it to the model
      this.validateSubFeat();

      // Return data
      this._activeModal.close(this.selectedOption);
    });
  }

  onOptionSelection = (id: string) => {
    // Get selected object from list of options and populate the property
    this.selectedOption = this.options.find(x => x.id === id);
  }

  private getRelevantData = () => {
    switch (this.memberType) {
      case BranchingChoiceOptions.ABILITY:
        this.label = "Ability:";
        return this._branchingService.getAbilities();
      case BranchingChoiceOptions.FEAT:
        this.label = "Feat:";
        return this._branchingService.getFeats();
      case BranchingChoiceOptions.MODIFIER:
        this.label = "Modifier";
        return this._branchingService.getModifiers();
      case BranchingChoiceOptions.SPELL:
        this.label = "Spell";
        return this._branchingService.getSpells();
      default:
        this._activeModal.dismiss("No Option Type specified"); 
    }
  }

  private getFullBranchForSelection = () => {
    switch (this.memberType) {
      case BranchingChoiceOptions.ABILITY:
        return this._branchingService.getAbility(this.selectedOption.id);
      case BranchingChoiceOptions.FEAT:
        return this._branchingService.getFeat(this.selectedOption.id);
      case BranchingChoiceOptions.MODIFIER:
        // Modifier doesn't have any branching data, so the current selection is already complete. Return the selection as observable
        return of(this.selectedOption);
      case BranchingChoiceOptions.SPELL:
        // Spell doesn't have any branching data, so the current selection is already complete. Return the selection as observable
        return of(this.selectedOption);
      default:
        this._activeModal.dismiss("No Option Type specified"); 
    }
  }

  private validateSubFeat = () => {
    // Check if option type is a feat
    if (this.memberType === BranchingChoiceOptions.FEAT) {
      
      // Verify if feat is not nested within itself
      if (this.selectedOption.id === this.choiceContainer.parentId) {
        this._activeModal.dismiss(BranchingFeatValidationErrors.NESTEDINSELF);
      }

      // Verify if nested feat has no nested feats itself (max subfeats level is 1)
      if (this.choiceContainer.discriminator === BranchingChoiceTypes.FEAT_SUBFEATS && this.selectedOption.subFeats?.length > 0) {
        this._activeModal.dismiss(BranchingFeatValidationErrors.NESTEDBRANCHEDFEAT);
      }
    }
  }
}
