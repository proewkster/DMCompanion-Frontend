import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Choice_Feat_Abilities } from 'src/app/admin/models/branching/branching_choice_feat_abilities';
import { Branching_Choice_Feat_Modifiers } from 'src/app/admin/models/branching/branching_choice_feat_modifiers';
import { Branching_Choice_Feat_SubFeats } from 'src/app/admin/models/branching/branching_choice_feat_subfeats';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';
import { ModalAddChoiceComponent } from '../modal-add-choice/modal-add-choice.component';

declare var $: any;

@Component({
  selector: 'branching-template-feat',
  templateUrl: './template-feat.component.html',
  styleUrls: ['../branching.component.scss', './template-feat.component.scss']
})
export class TemplateFeatComponent implements OnInit {

  @Input() feat: Branching_Feat;
  @Input() root: boolean;
  @Input() isSubFeat = false;
  @Output() deleteFeatEvent = new EventEmitter<Branching_Feat>();

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  deleteFeat = () => {
    // Return choice to listener
    this.deleteFeatEvent.emit(this.feat);
  }

  addChoiceToFeats = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_Feat_SubFeats();

    // Attach parent to choice
    choice.parentId = this.feat.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Feat - SubFeats";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.feat.subFeats.push(data);
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  addChoiceToAbilities = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_Feat_Abilities();

    // Attach parent to choice
    choice.parentId = this.feat.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Feat - Abilities";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.feat.abilities.push(data);
      }
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    });
  }

  addChoiceToModifiers = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_Feat_Modifiers();

    // Attach parent to choice
    choice.parentId = this.feat.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Feat - Modifiers";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.feat.modifiers.push(data);
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
    if (choice.parentId === this.feat.id) {
      
      // Check choice discriminator to determine proper action
      if (choice.discriminator === BranchingChoiceTypes.FEAT_ABILITIES) {
        // Get index of choice object in abilities list
        let index = this.feat.abilities.indexOf(choice);

        // Remove choice from abilities list
        this.feat.abilities.splice(index, 1);
      }
      else if (choice.discriminator === BranchingChoiceTypes.FEAT_SUBFEATS) {
        // Get index of choice object in abilities list
        let index = this.feat.subFeats.indexOf(choice);

        // Remove choice from abilities list
        this.feat.subFeats.splice(index, 1);
      }
      else if (choice.discriminator === BranchingChoiceTypes.FEAT_MODIFIERS) {
        // Get index of choice object in abilities list
        let index = this.feat.modifiers.indexOf(choice);

        // Remove choice from abilities list
        this.feat.modifiers.splice(index, 1);
      }
    }
  }

}
