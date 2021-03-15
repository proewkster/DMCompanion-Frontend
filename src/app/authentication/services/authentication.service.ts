import { CustomEncoder } from './../../shared/helpers/custom-encoder';
import { HttpParams } from '@angular/common/http';
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

  public confirmEmail = (token: string, userId: string) => {
    // Build query parameters
    let params = new HttpParams({ encoder: new CustomEncoder() })
      .set('userId', userId)
      .set('token', token);

    // Request API call
    return this._http.requestCall(ApiEndPoints.CONFIRMEMAIL, ApiMethod.GET, { params: params });
  }
  
}
