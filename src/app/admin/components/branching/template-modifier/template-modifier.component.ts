import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branching_Modifier } from 'src/app/admin/models/branching/branching_modifier';

@Component({
  selector: 'branching-template-modifier',
  templateUrl: './template-modifier.component.html',
  styleUrls: ['../branching.component.scss', './template-modifier.component.scss']
})
export class TemplateModifierComponent implements OnInit {

  @Input() modifier: Branching_Modifier;
  @Input() root: boolean;
  @Output() deleteModifierEvent = new EventEmitter<Branching_Modifier>();
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteModifier = () => {
    // Return choice to listener
    this.deleteModifierEvent.emit(this.modifier);
  }

}
