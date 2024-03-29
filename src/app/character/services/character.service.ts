import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { DTO_NewCharacter } from '../models/DTO/dto-newcharacter';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private _http: HttpService) { }

  getCharacters() {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.GET);
  }
  getCharacter = (id: string) => {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.GET, id);
  }

  createNewCharacter(newCharacter: DTO_NewCharacter) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.POST, null, newCharacter);
  }
  updateCharacter(char: DTO_NewCharacter) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.PUT, null, char);
  }
  deleteCharacter(id: string) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.DELETE, id);
  }
}
