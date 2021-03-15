import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../models/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: string[] = ["elf", "dwarf", "human", "orc"]
  constructor(private http: HttpClient) { }
  // getRaceNames():Observable<string[]> {
  //   return this.http.get<string[]>("");
  // }
  getRaceNames() {
    return this.races;
  }
}
