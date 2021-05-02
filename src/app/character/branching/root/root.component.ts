import { Component, Input, OnInit } from '@angular/core';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';

@Component({
  selector: 'character-branching-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  @Input() race: Branching_Race;
  //@Input() class: Branching_Class; --> To be implemented

  constructor() { }

  ngOnInit(): void {
  }

}
