import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPasswordComponent } from './edit-password/edit-password.component';



@NgModule({
  declarations: [DetailsComponent, EditUserComponent, EditPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'userdetails', component: DetailsComponent },
      { path: 'edituser', component: EditUserComponent }
    ])
  ]
})
export class UserModule { }
