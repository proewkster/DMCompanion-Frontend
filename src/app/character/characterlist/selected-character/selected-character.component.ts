import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Character } from 'src/app/models/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-selected-character',
  templateUrl: './selected-character.component.html',
  styleUrls: ['./selected-character.component.scss']
})
export class SelectedCharacterComponent implements OnInit {
  public char: Character = new Character(null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  constructor(private characterservice: CharacterService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getcharacter();
  }
  getcharacter() {
    this.activatedroute.paramMap.subscribe(
      (route: ParamMap) => {
        this.characterservice.getCharacter(route.get('id'))
          .subscribe(data => { this.char = data; })
      }
    )
  }
}
