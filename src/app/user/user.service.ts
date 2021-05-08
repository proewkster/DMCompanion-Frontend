import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../shared/enums/api-endpoints';
import { ApiMethod } from '../shared/enums/api-method';
import { CustomEncoder } from '../shared/helpers/custom-encoder';
import { HttpService } from '../shared/services/http.service';
import { RemoveUser } from './models/dto-remove-user';
import { DtoUpdateEmail } from './models/dto-update-email';
import { DtoUpdatePassword } from './models/dto-update-password';
import { DTOUpdateUser } from './models/dto-update-user';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  constructor(private _http: HttpService) { }
  getUser(): Observable<User> {

    return this._http.requestCall(ApiEndPoints.USER_DATA, ApiMethod.GET);
  }
  downloadPersonalData() {
    return this._http.requestCall(ApiEndPoints.DOWNLOADPERSONALDATA, ApiMethod.GET);
  }
  deletePersonalData(userDelete: RemoveUser) {
    return this._http.requestCall(ApiEndPoints.DELETEPERSONALDATA, ApiMethod.POST, null, userDelete);
  }
  updateUser(user: DTOUpdateUser) {
    return this._http.requestCall(ApiEndPoints.USER_UPDATE, ApiMethod.PUT, null, user);
  }
  updatePassword(password: DtoUpdatePassword) {
    return this._http.requestCall(ApiEndPoints.USER_UPDATEPASSWORD, ApiMethod.PUT, null, password)
  }
  updateEmail(email: DtoUpdateEmail) {
    return this._http.requestCall(ApiEndPoints.USER_UPDATEEMAIL, ApiMethod.PUT, null, email)
  }
  public confirmEmail = (token: string, email: string, userId: string) => {
    // Build query parameters
    let params = new HttpParams({ encoder: new CustomEncoder() })
      .set('userId', userId)
      .set('email', email)
      .set('token', token);

    // Request API call
    return this._http.requestCall(ApiEndPoints.CONFIRMUPDATEDEMAIL, ApiMethod.GET, null, { params: params });
  }
}
