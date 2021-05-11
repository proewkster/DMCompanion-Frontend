import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branching_Spell } from 'src/app/admin/models/branching/branching_spell';

@Component({
  selector: 'branching-template-spell',
  templateUrl: './template-spell.component.html',
  styleUrls: ['../branching.component.scss', './template-spell.component.scss']
})
export class TemplateSpellComponent implements OnInit {

  @Input() spell: Branching_Spell;
  @Input() root: boolean;
  @Output() deleteSpellEvent = new EventEmitter<Branching_Spell>();
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteSpell = () => {
    // Return choice to listener
    this.deleteSpellEvent.emit(this.spell);
  }

}