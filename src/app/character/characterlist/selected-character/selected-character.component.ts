import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Character } from '../../models/Main/character';
import { Skill } from '../../models/Main/skill';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-selected-character',
  templateUrl: './selected-character.component.html',
  styleUrls: ['./selected-character.component.scss']
})
export class SelectedCharacterComponent implements OnInit {

  character: Character;
  isLoading = true;

  skills: Skill[] = [];

  constructor(private _characterservice: CharacterService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // Get character data from database
    this.getCharacter();
  }

  getCharacter = () => {
    this._activatedroute.paramMap.subscribe(
      (route: ParamMap) => {
        // Get character ID from route parameter
        let id = route.get('id');

        // Get character data through API
        this._characterservice.getCharacter(id).subscribe(data => {
          if(data) {
            // Map data to property
            this.character = data;

            // Populate skill list
            this.character.abilityScores.forEach(abilityScore => {
              // Fetch each skill in the ability score
              abilityScore.skills.forEach(skill => {
                this.skills.push(skill);
              })
            })

            // Sort skills alphabetically
            this.skills.sort(function(a,b) {
              return a.name.localeCompare(b.name);
            });

            // Unset loading parameter
            this.isLoading = false;
          }
        });
      }
    )
  }
}
