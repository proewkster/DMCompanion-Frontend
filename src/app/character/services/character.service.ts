import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { DtoNewcharacter } from '../models/dto-newcharacter';

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

  createNewCharacter(char: DtoNewcharacter) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.POST, null, char);
  }
  updateCharacter(char: DtoNewcharacter) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.PUT, null, char);
  }
  deleteCharacter(id: string) {
    return this._http.requestCall(ApiEndPoints.CHARACTERDATA_CHARACTER, ApiMethod.POST, id);
  }
}
