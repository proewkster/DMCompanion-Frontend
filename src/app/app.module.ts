import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './main/header/header.component';
import { HomeComponent } from './main/home/home.component';
import { FooterComponent } from './main/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CharacterlistComponent } from './character/characterlist/characterlist.component';
import { NewcharacterComponent } from './character/newcharacter/newcharacter.component';
import { SelectedCharacterComponent } from './character/characterlist/selected-character/selected-character.component';
import * as $ from 'jquery';//NODIG voor de $ in create char next button. is in gebruik ook al is et hier niet highlighted.

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CharacterlistComponent,
    NewcharacterComponent,
    SelectedCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
