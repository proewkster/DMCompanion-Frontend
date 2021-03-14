import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { DTO_Register } from '../models/dto_register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private _http: HttpService) { }

  public registerUser = (data: DTO_Register) => {
    return this._http.requestCall(ApiEndPoints.REGISTER, ApiMethod.POST, data);
  }
  
}
