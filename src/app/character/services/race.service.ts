import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { CustomEncoder } from 'src/app/shared/helpers/custom-encoder';
import { HttpService } from 'src/app/shared/services/http.service';
import { Race } from '../../models/race';

@Injectable({
    providedIn: 'root'
})
export class RaceService {
    public getMainRaces = () => {
        // Build query parameter to add Type-filter to request
        let params = new HttpParams({ encoder: new CustomEncoder() })
            .set('type', 'Main');

        // Launch call
        return this._http.requestCall(ApiEndPoints.SOURCEDATA_RACE, ApiMethod.GET, null, { params: params });
    }
    
    constructor(private _http: HttpService) { }
   
}
