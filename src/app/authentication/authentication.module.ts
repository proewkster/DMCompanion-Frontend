import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ConfirmEmailAddressComponent } from './components/confirm-email-address/confirm-email-address.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [RegisterComponent, RegisterSuccessComponent, ConfirmEmailAddressComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'register/success', component: RegisterSuccessComponent },
      { path: 'confirmemailaddress', component: ConfirmEmailAddressComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
