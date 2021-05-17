import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DtoListCharacters } from '../../models/DTO/dto-list-characters';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-delete-character',
  templateUrl: './delete-character.component.html',
  styleUrls: ['./delete-character.component.scss']
})
export class DeleteCharacterComponent implements OnInit {
  character: DtoListCharacters;
  title: string;
  constructor(private _activeModal: NgbActiveModal, private _characterdataService: CharacterService) { }

  ngOnInit(): void {
  }
  public deleteCharacter = () => {
    // Delete Ability from database
    this._characterdataService.deleteCharacter(this.character.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
        error => {
          this._activeModal.close(error);
        });
  }
}
