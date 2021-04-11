import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { DtoListCharacters } from '../models/dto-list-characters';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.scss']
})
export class CharacterlistComponent implements OnInit {
  characters: DtoListCharacters[];
  constructor(private router: Router, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharList();
  }
  getCharList() {
    this.characterService.getCharacters()
      .subscribe(data => {
        this.characters = data;
      },
        error => {
          console.log("An error occurred while retrieving data from the server");
        });
  }
}
