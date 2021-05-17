import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Spell } from 'src/app/admin/models/branching/branching_spell';
import { DTO_NewCharacter_Ability } from 'src/app/character/models/DTO/dto_newcharacter_ability';
import { DTO_NewCharacter_Spell } from 'src/app/character/models/DTO/dto_newcharacter_spell';

declare var $: any;

@Component({
  selector: 'character-branching-template-spell',
  templateUrl: './template-spell.component.html',
  styleUrls: ['./template-spell.component.scss']
})
export class TemplateSpellComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Spell>;
  @Input() abilityModel: DTO_NewCharacter_Ability;
  @Input() rootId: string;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedSpell: Branching_Spell;

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
      this.selectedSpell = this.choice.options[0];

      // Add selection to character model
      this.addSelectionToCharacterModel();

      // Validate choice
      this.choice.isValid = true;

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  resetSelection = () => {
    // Remove spell from character model
    this.removeExistingSpell();

    // Destroy current selection
    this.selectedSpell = undefined;

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
    if (this.selectedSpell !== undefined) {
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
    // Create new spell object
    let newSpell = new DTO_NewCharacter_Spell(this.selectedSpell.id, this.choice.level, this.rootId, this.choice.parentId);

    // Add spell to list
    this.abilityModel.spells.push(newSpell)
  }

  private removeExistingSpell = () => {
    // Ability detected, remove modifier from list
    let index = this.abilityModel.spells.findIndex(x => x.id = this.selectedSpell.id);
    this.abilityModel.spells.splice(index, 1);
  }
}
