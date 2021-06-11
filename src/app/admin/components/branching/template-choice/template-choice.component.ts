import { ToastrService } from 'ngx-toastr';
import { ModalAddOptionComponent } from './../modal-add-option/modal-add-option.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';
import { ModalAddChoiceComponent } from '../modal-add-choice/modal-add-choice.component';
import { BranchingChoiceOptions } from 'src/app/enums/branching-choice-option.enum';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { Branching_Ability } from 'src/app/admin/models/branching/branching_ability';
import { Branching_Modifier } from 'src/app/admin/models/branching/branching_modifier';
import { Branching_Spell } from 'src/app/admin/models/branching/branching_spell';
import { BranchingFeatValidationErrors } from 'src/app/enums/branching-feat-validation-errors.enum';

@Component({
  selector: 'branching-template-choice',
  templateUrl: './template-choice.component.html',
  styleUrls: ['../branching.component.scss', './template-choice.component.scss']
})
export class TemplateChoiceComponent implements OnInit {

  @Input() choice: Branching_Choice<any,any>;
  @Output() deleteChoiceEvent = new EventEmitter<Branching_Choice<any,any>>();

  private optionsSmall: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  private optionsMedium: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "md"
  }

  limitedTypeFlag = false;

  constructor(private _modalService: NgbModal, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    // Check if options contain options of type ANY or ALL and disable buttons accordingly
    if (this.choice.options[0]?.name.endsWith("- Any") || this.choice.options[0]?.name.endsWith("- All")) {
      this.limitedTypeFlag = true;
    }
  }

  editChoice = () => {
    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.optionsSmall);
    modalRef.componentInstance.choice = this.choice;
    modalRef.componentInstance.title = "Edit Choice";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.choice = data;
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  deleteChoice = () => {
    // Return choice to listener
    this.deleteChoiceEvent.emit(this.choice);
  }

  addOption = () => {
    // Open Modal
    const modalRef = this._modalService.open(ModalAddOptionComponent, this.optionsMedium);
    modalRef.componentInstance.choiceContainer = this.choice;

    // Set Modal properties based on type
    switch (this.choice.discriminator) {
      case BranchingChoiceTypes.ABILITY_MODIFIERS:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.MODIFIER;
        modalRef.componentInstance.title = "Add Modifier";
        break;
      case BranchingChoiceTypes.CASTSPELL_SPELLS:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.SPELL;
        modalRef.componentInstance.title = "Add Spell";
        break;
      case BranchingChoiceTypes.FEAT_ABILITIES:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.ABILITY;
        modalRef.componentInstance.title = "Add Ability";
        break;
      case BranchingChoiceTypes.FEAT_MODIFIERS:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.MODIFIER;
        modalRef.componentInstance.title = "Add Modifier";
        break;
      case BranchingChoiceTypes.FEAT_SUBFEATS:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.FEAT;
        modalRef.componentInstance.title = "Add Feat";
        break;
      case BranchingChoiceTypes.RACE_ABILITIES:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.ABILITY;
        modalRef.componentInstance.title = "Add Ability";
        break;
      case BranchingChoiceTypes.RACE_FEATS:
        modalRef.componentInstance.memberType = BranchingChoiceOptions.FEAT;
        modalRef.componentInstance.title = "Add Feat";
        break;
    }

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Check if selected option is already in list
        if (this.choice.options.find(x => x.id === data.id) !== undefined) {
          // Selection has already been added, display error message
          this._toastrService.error("The selected option was already added to this choice. You cannot add an option twice to the same choice.");
        }
        // Check if present option is of type ANY or ALL
        else if (this.choice.options.length > 0 && (this.choice.options[0].name.endsWith("- Any") || this.choice.options[0].name.endsWith("- All"))) {
          // Choice already contains an ANY or ALL type options, which cannot be combined with other options
          this._toastrService.error("Choice already contains an option of type 'ANY' or 'ALL'. These options cannot be combined with other options.");
        }
        else {
          // Check if option is of type ANY or ALL and other options were already added
          if ((data.name.endsWith("- Any") || data.name.endsWith("- All")) && this.choice.options.length > 0) {
            // ANY or ALL type option detected, but choice already contains other options, display error message
            this._toastrService.error("An option of type 'ANY' or 'ALL' cannot be combined with other options.");
          }

          // New option is valid
          else {
            // Check for ANY and ALL options and set flag accordingly
            if (data.name.endsWith("- Any") || data.name.endsWith("- All")) {
              this.limitedTypeFlag = true;
            }

            // Add choice to parent list
            this.choice.options.push(data);
          }
        } 
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
      else if (error === BranchingFeatValidationErrors.NESTEDINSELF) {
        // Feat was nested in itself
        this._toastrService.error("You cannot nest a Feat within itself.");
      }
      else if (error === BranchingFeatValidationErrors.NESTEDBRANCHEDFEAT) {
        // A Feat that already has SubFeats was nested, which is not allowed (max subfeat level is 1)
        this._toastrService.error("You tried adding a SubFeat which already has SubFeats itself. This is not allowed.")
      }
    });
  }

  onDeleteAbility = (ability: Branching_Ability) => {
    // Get index of choice object in abilities list
    let index = this.choice.options.indexOf(ability);

    // Delete option from list
    this.deleteOption(index);
  }

  onDeleteFeat = (feat: Branching_Feat) => {
    // Get index of choice object in abilities list
    let index = this.choice.options.indexOf(feat);

    // Delete option from list
    this.deleteOption(index);
  }

  onDeleteModifier = (modifier: Branching_Modifier) => {
    // Get index of choice object in abilities list
    let index = this.choice.options.indexOf(modifier);

    // Delete option from list
    this.deleteOption(index);
  }

  onDeleteSpell = (spell: Branching_Spell) => {
    // Get index of choice object in abilities list
    let index = this.choice.options.indexOf(spell);

    // Delete option from list
    this.deleteOption(index);
  }

  private deleteOption = (index: number) => {
    // Remove choice from abilities list
    this.choice.options.splice(index, 1);

    // Reset limitedTypeFlag
    this.limitedTypeFlag = false;
  }
}
