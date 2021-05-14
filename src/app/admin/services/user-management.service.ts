import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { DTOChangeAdmin } from '../models/UserManagement/dtochange-admin';
import { DTOUserlist } from '../models/UserManagement/dtouserlist';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private _http: HttpService) { }
  getUsers(): Observable<DTOUserlist[]> {

    return this._http.requestCall(ApiEndPoints.USER_LIST, ApiMethod.GET);
  }
  changeAdmin(isadmin: DTOChangeAdmin) {
    return this._http.requestCall(ApiEndPoints.CHANGE_ADMIN, ApiMethod.PUT, null, isadmin);
  }
  deleteUser(userDelete: string) {
    return this._http.requestCall(ApiEndPoints.DELETE_USER, ApiMethod.DELETE, userDelete);
  }
}
