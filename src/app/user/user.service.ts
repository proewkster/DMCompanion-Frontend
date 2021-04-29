import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../shared/enums/api-endpoints';
import { ApiMethod } from '../shared/enums/api-method';
import { HttpService } from '../shared/services/http.service';
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
  updateUser(user: DTOUpdateUser) {
    return this._http.requestCall(ApiEndPoints.USER_UPDATE, ApiMethod.PUT, null, user);
  }
}
