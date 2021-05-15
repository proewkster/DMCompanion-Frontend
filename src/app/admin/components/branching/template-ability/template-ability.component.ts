import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Ability } from 'src/app/admin/models/branching/branching_ability';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Choice_Ability_Modifiers } from 'src/app/admin/models/branching/branching_choice_abitlity_modifiers';
import { Branching_Choice_CastSpell_Spells } from 'src/app/admin/models/branching/branching_choice_castspell_spells';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';
import { ModalAddChoiceComponent } from '../modal-add-choice/modal-add-choice.component';

declare var $: any;

@Component({
  selector: 'branching-template-ability',
  templateUrl: './template-ability.component.html',
  styleUrls: ['../branching.component.scss', './template-ability.component.scss']
})
export class TemplateAbilityComponent implements OnInit {

  @Input() ability: any;
  @Input() root: boolean;
  @Output() deleteAbilityEvent = new EventEmitter<Branching_Ability>();

  isCastSpell = false;

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.ability.castingLevel !== undefined) {
      this.isCastSpell = true;
    }
  }

  deleteAbility = () => {
    // Return choice to listener
    this.deleteAbilityEvent.emit(this.ability);
  }

  addChoiceToModifiers = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_Ability_Modifiers();

    // Attach parent to choice
    choice.parentId = this.ability.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Ability - Modifiers";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.ability.modifiers.push(data);
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  addChoiceToSpells = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_CastSpell_Spells();

    // Attach parent to choice
    choice.parentId = this.ability.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Ability - Spells";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.ability.spells.push(data);
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  onDeleteChoice = (choice: Branching_Choice<any,any>) => {

    // Check if choice's parent Id matches current member object
    if (choice.parentId === this.ability.id) {
      
      // Check choice discriminator to determine proper action
      if (choice.discriminator === BranchingChoiceTypes.ABILITY_MODIFIERS) {
        // Get index of choice object in abilities list
        let index = this.ability.modifiers.indexOf(choice);

        // Remove choice from abilities list
        this.ability.modifiers.splice(index, 1);
      }
      else if (choice.discriminator === BranchingChoiceTypes.CASTSPELL_SPELLS) {
        // Get index of choice object in abilities list
        let index = this.ability.spells.indexOf(choice);

        // Remove choice from abilities list
        this.ability.spells.splice(index, 1);
      }
    }
  }
}
