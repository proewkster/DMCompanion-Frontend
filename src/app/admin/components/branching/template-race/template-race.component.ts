import { ModalAddChoiceComponent } from './../modal-add-choice/modal-add-choice.component';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice_Race_Abilities } from 'src/app/admin/models/branching/branching_choice_race_abilities';
import { Branching_Choice_Race_Feats } from 'src/app/admin/models/branching/branching_choice_race_feats';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';

declare var $: any;

@Component({
  selector: 'branching-template-race',
  templateUrl: './template-race.component.html',
  styleUrls: ['../branching.component.scss', './template-race.component.scss']
})
export class TemplateRaceComponent implements OnInit, AfterViewInit {

  @Input() race: Branching_Race;
  @Input() root: boolean;

  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  constructor(private _modalService: NgbModal) { }

  ngAfterViewInit(): void {
    // Collapse submenus
    $('.submenu').collapse();
  }

  ngOnInit(): void {
  }

  deleteRace = () => {

  }

  addChoiceToFeats = () => {
    // Create instance of correct derived class of Choice to pass to the modal
    let choice = new Branching_Choice_Race_Feats();

    // Attach parent to choice
    choice.parentId = this.race.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Race - Feats";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.race.feats.push(data);
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
    let choice = new Branching_Choice_Race_Abilities();

    // Attach parent to choice
    choice.parentId = this.race.id;

    // Open modal
    const modalRef = this._modalService.open(ModalAddChoiceComponent, this.options);
    modalRef.componentInstance.choice = choice;
    modalRef.componentInstance.title = "Add choice for Race - Abilities";

    // Subscribe to modal response
    modalRef.result.then(data => {
      if (data) {
        // Add choice to parent list
        this.race.abilities.push(data);
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
    if (choice.parentId === this.race.id) {
      
      // Check choice discriminator to determine proper action
      if (choice.discriminator === BranchingChoiceTypes.RACE_ABILITIES) {
        // Get index of choice object in abilities list
        let index = this.race.abilities.indexOf(choice);

        // Remove choice from abilities list
        this.race.abilities.splice(index, 1);
      }
      else if (choice.discriminator === BranchingChoiceTypes.RACE_FEATS) {
        // Get index of choice object in abilities list
        let index = this.race.feats.indexOf(choice);

        // Remove choice from abilities list
        this.race.feats.splice(index, 1);
      }
    }
  }
}
