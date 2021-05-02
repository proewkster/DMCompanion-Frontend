import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './main/header/header.component';
import { HomeComponent } from './main/home/home.component';
import { FooterComponent } from './main/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CharacterlistComponent } from './character/characterlist/characterlist.component';
import { NewcharacterComponent } from './character/newcharacter/newcharacter.component';
import { SelectedCharacterComponent } from './character/characterlist/selected-character/selected-character.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@auth0/angular-jwt';
import * as $ from 'jquery';
import { DeleteCharacterComponent } from './character/characterlist/delete-character/delete-character.component';
import { RaceComponent } from './character/newcharacter/race/race.component';
import { RootComponent } from './character/branching/root/root.component';
import { TemplateFeatComponent } from './character/branching/templates/template-feat/template-feat.component';
import { TemplateAbilityComponent } from './character/branching/templates/template-ability/template-ability.component';
import { TemplateSelectionModalComponent } from './character/branching/templates/template-selection-modal/template-selection-modal.component';
import { TemplateModifierComponent } from './character/branching/templates/template-modifier/template-modifier.component';//NODIG voor de $ in create char next button. is in gebruik ook al is et hier niet highlighted.

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CharacterlistComponent,
    NewcharacterComponent,
    SelectedCharacterComponent,
    DeleteCharacterComponent,
    RaceComponent,
    RootComponent,
    TemplateFeatComponent,
    TemplateAbilityComponent,
    TemplateSelectionModalComponent,
    TemplateModifierComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AdminModule,
    RouterModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
