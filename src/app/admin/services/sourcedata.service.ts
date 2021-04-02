import { DTO_SourceData_Source } from './../models/sourcedata/dto_sourcedata_source';
import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SourcedataService {

  constructor(private _http: HttpService) { }

  public getSources = () => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.GET);
  }

  public getSource = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.GET, id)
  }

  public createSource = (source: DTO_SourceData_Source) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.POST, null, source);
  }

  public updateSource = (source: DTO_SourceData_Source) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.PUT, null, source)
  }

  public deleteSource = (id: string) => {
    return this._http.requestCall(ApiEndPoints.SOURCEDATA_SOURCE, ApiMethod.DELETE, id)
  }
}
