import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Branching_Modifier } from 'src/app/admin/models/branching/branching_modifier';

declare var $: any;

@Component({
  selector: 'character-branching-template-modifier',
  templateUrl: './template-modifier.component.html',
  styleUrls: ['./template-modifier.component.scss']
})
export class TemplateModifierComponent implements OnInit, AfterViewInit {

  @Input() modifierOptions: Branching_Modifier[];

  selectedModifier: Branching_Modifier;

  constructor() { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    if (this.modifierOptions.length === 1) {
      this.selectedModifier = this.modifierOptions[0];
    }
  }

}
