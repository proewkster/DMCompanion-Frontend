import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Modifier } from 'src/app/admin/models/branching/branching_modifier';
import { DTO_NewCharacter_Modifier } from 'src/app/character/models/dto_newcharacter-modifier';
import { DTO_NewCharacter_Ability } from 'src/app/character/models/dto_newcharacter_ability';
import { DTO_NewCharacter_Feat } from 'src/app/character/models/dto_newcharacter_feat';
import { ClassIdentifiers } from 'src/app/enums/class-identifier.enum';

declare var $: any;

@Component({
  selector: 'character-branching-template-modifier',
  templateUrl: './template-modifier.component.html',
  styleUrls: ['./template-modifier.component.scss']
})
export class TemplateModifierComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Modifier>;
  @Input() featModel: DTO_NewCharacter_Feat;
  @Input() abilityModel: DTO_NewCharacter_Ability;
  @Input() rootId: string;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedModifier: Branching_Modifier;

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();

    // Manually trigger change detection on view elements to check if classes have been changed through triggered validation of child elements
    // Not doing this causes an ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
    if (this.choice.options.length === 1) {
      // Automatically select the only option in the list
      this.selectedModifier = this.choice.options[0];

      // Add selection to character model
      this.addSelectionToCharacterModel();

      // Validate choice
      this.choice.isValid = true;

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  resetSelection = () => {
    // Remove modifier from character model
    this.removeExistingModifier();
    
    // Destroy current selection
    this.selectedModifier = undefined;

    // Invalidate choice
    this.choice.isValid = false;

    // Trigger validationChanged event
    this.validationChanged.emit(this.choice.isValid);

    // Rebuild selection menu
    setTimeout(() => {
      $('.selectpicker').selectpicker();
    }, 1);
  }

  onSelectionChange = () => {
    if (this.selectedModifier !== undefined) {
      // Validate choice
      this.choice.isValid = true;
    }
    else {
      // Invalidate choice
      this.choice.isValid = false;
    }

    // Add selection to character model
    this.addSelectionToCharacterModel();

    // Trigger validationChanged event
    this.validationChanged.emit(this.choice.isValid);
  }

  private addSelectionToCharacterModel = () => {
    // Create new modifier object
    let newModifier = new DTO_NewCharacter_Modifier(this.selectedModifier.id, this.choice.level, this.choice.parentId, this.rootId);

    // Detect the modifier's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.FEAT:
        // Feat detected, add modifier to list
        this.featModel.modifiers.push(newModifier);
        break;
      case ClassIdentifiers.ABILITY:
        // Ability detected, add modifier to list
        this.abilityModel.modifiers.push(newModifier);
        break;
    }
  }

  private removeExistingModifier = () => {
    // Detect the feat's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.FEAT:
        // Feat detected, remove modifier from list
        let featIndex = this.featModel.modifiers.findIndex(x => x.id = this.selectedModifier.id);
        this.featModel.modifiers.splice(featIndex, 1);
        break;
      case ClassIdentifiers.ABILITY:
        // Ability detected, remove modifier from list
        let abilityIndex = this.abilityModel.modifiers.findIndex(x => x.id = this.selectedModifier.id);
        this.abilityModel.modifiers.splice(abilityIndex, 1);
        break;
    }
  }
}
