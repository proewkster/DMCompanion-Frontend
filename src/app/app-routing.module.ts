import { AdminGuard } from './authentication/guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { CharacterlistComponent } from './character/characterlist/characterlist.component';
import { SelectedCharacterComponent } from './character/characterlist/selected-character/selected-character.component';
import { NewcharacterComponent } from './character/newcharacter/newcharacter.component';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "Characters", component: CharacterlistComponent, canActivate: [AuthGuard] },
  { path: "Characters/:id", component: SelectedCharacterComponent, canActivate: [AuthGuard] },
  { path: "newCharacter", component: NewcharacterComponent, canActivate: [AuthGuard] },
  { path: "editCharacter/:id", component: NewcharacterComponent, canActivate: [AuthGuard] },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'error', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
