import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.scss']
})
export class CharacterlistComponent implements OnInit {
  characters: Character[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
