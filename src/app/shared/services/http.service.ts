import { ApiMethod } from './../enums/api-method';
import { ApiEndPoints } from '../enums/api-endpoints';
import { GlobalSettings } from './../globalsettings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  requestCall(endpoint: ApiEndPoints, method: ApiMethod, data?: any) {
    // Define response as the result of any API call
    let response;

    // Generate the API call based on the input provided
    switch(method) {
      case ApiMethod.GET:
        response = this._http.get(GlobalSettings['ApiServer'] + endpoint, data);
        break;
      case ApiMethod.POST:
        response = this._http.post(GlobalSettings['ApiServer'] + endpoint, data);
        break;
      case ApiMethod.PUT:
        response = this._http.put(GlobalSettings['ApiServer'] + endpoint, data);
        break;
      case ApiMethod.DELETE:
        response = this._http.delete(GlobalSettings['ApiServer'] + endpoint, data);
        break;
    }

    // Return response to calling method
    return response;
  }
}
