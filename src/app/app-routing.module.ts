import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterlistComponent } from './character/characterlist/characterlist.component';
import { SelectedCharacterComponent } from './character/characterlist/selected-character/selected-character.component';
import { NewcharacterComponent } from './character/newcharacter/newcharacter.component';
import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "Characters", component: CharacterlistComponent },
  { path: "newCharacter", component: NewcharacterComponent },
  { path: "Character:id", component: SelectedCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
