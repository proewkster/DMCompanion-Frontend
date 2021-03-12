import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Alignment } from 'src/app/enums/alignment.enum';
import { Character } from 'src/app/models/character';
import { Size } from 'src/app/enums/size.enum';
import { CharacterService } from 'src/app/services/character.service';
import { AbilityScore } from 'src/app/models/ability-score';
import { Personality } from 'src/app/models/personality';


@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit {

  constructor(private router: Router, private characterService: CharacterService) { }
  character: Character = new Character("", 1, "", true, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", "", "", 0, 0, "", "", "", 0, 0);
  abScore: AbilityScore = new AbilityScore();
  personality: Personality = new Personality(0, "", "");
  
  public alignments = Object.values(Alignment).filter(value => typeof value != 'number');
  public genders = Object.values(Gender).filter(value => typeof value != 'number');
  public sizes = Object.values(Size).filter(value => typeof value != 'number');
  public addCharacter() {

  }
  backToList(): void {
    this.router.navigateByUrl("/Characters");
  }

  ngOnInit(): void {

  }
  save() {
    console.log(this.character);
  }
}
