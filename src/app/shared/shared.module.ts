import { GlobalSettings } from './globalsettings';
import { HttpService } from './services/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpService,
    GlobalSettings
  ]
})
export class SharedModule { }
