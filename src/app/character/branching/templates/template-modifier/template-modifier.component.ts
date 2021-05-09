import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Modifier } from 'src/app/admin/models/branching/branching_modifier';

declare var $: any;

@Component({
  selector: 'character-branching-template-modifier',
  templateUrl: './template-modifier.component.html',
  styleUrls: ['./template-modifier.component.scss']
})
export class TemplateModifierComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Modifier>;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedModifier: Branching_Modifier;

  constructor() { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
    if (this.choice.options.length === 1) {
      // Automatically select the only option in the list
      this.selectedModifier = this.choice.options[0];

      // Validate choice
      this.choice.isValid = true;

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  resetSelection = () => {
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

    // Trigger validationChanged event
    this.validationChanged.emit(this.choice.isValid);
  }
}
