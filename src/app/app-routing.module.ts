import { AdminGuard } from './authentication/guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { CharacterlistComponent } from './character/characterlist/characterlist.component';
import { SelectedCharacterComponent } from './character/characterlist/selected-character/selected-character.component';
import { NewcharacterComponent } from './character/newcharacter/newcharacter.component';
import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "Characters", component: CharacterlistComponent },
  { path: "newCharacter", component: NewcharacterComponent },
  { path: "Characters/:id", component: SelectedCharacterComponent },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'error', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
