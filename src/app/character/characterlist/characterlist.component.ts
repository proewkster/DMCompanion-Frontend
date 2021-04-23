import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtoListCharacters } from '../models/dto-list-characters';
import { DtoNewRace } from '../models/dto-new-race';
import { CharacterService } from '../services/character.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteCharacterComponent } from './delete-character/delete-character.component';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.scss']
})
export class CharacterlistComponent implements OnInit {
  characters: DtoListCharacters[];
  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }
  constructor(private router: Router, private characterService: CharacterService, private _modalService: NgbModal, private _toastrService: ToastrService) { }

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
  getraceName(races: DtoNewRace[]) {
    let race = races.find(r => r.type == "Sub");
    if (race === null) {
      race = races.find(r => r.type == "Main");
    }
    return race ? race.name : "";
  }
  public showDeleteCharacterModal = (character: DtoListCharacters) => {

    // Open modal
    const modalRef = this._modalService.open(DeleteCharacterComponent, this.options);
    modalRef.componentInstance.title = "Delete Character";
    modalRef.componentInstance.character = character;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("Character could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.characters.indexOf(character);

          this.characters.splice(index, 1);

          // Show success message
          this._toastrService.success("Character successfully removed");
        }
      }
    },
      error => {
        console.log(error);
        if (error === "Close click" || error === "Cross click") {
          // Modal dismissed, no specific action
          // Error catch is needed to suppress errors in UI
        }
      });
  }
}
