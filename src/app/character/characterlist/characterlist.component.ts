import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.scss']
})
export class CharacterlistComponent implements OnInit {
  // DIT MOET vAN DE KLASSE CHAR EEN ARRAY WORDEN
  characters: string[] = ["char1test", "char2test"];
  constructor() { }

  ngOnInit(): void {
  }

}
