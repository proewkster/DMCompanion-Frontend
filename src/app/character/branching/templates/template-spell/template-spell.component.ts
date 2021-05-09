import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Spell } from 'src/app/admin/models/branching/branching_spell';

declare var $: any;

@Component({
  selector: 'character-branching-template-spell',
  templateUrl: './template-spell.component.html',
  styleUrls: ['./template-spell.component.scss']
})
export class TemplateSpellComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Spell>;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedSpell: Branching_Spell;

  constructor() { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    if (this.choice.options.length === 1) {
      // Automatically select the only option in the list
      this.selectedSpell = this.choice.options[0];

      // Validate choice
      this.choice.isValid = true;

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  resetSelection = () => {
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

    // Trigger validationChanged event
    this.validationChanged.emit(this.choice.isValid);
  }
}
