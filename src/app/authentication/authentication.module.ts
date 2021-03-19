import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ConfirmEmailAddressComponent } from './components/confirm-email-address/confirm-email-address.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



@NgModule({
  declarations: [RegisterComponent, RegisterSuccessComponent, ConfirmEmailAddressComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'register/success', component: RegisterSuccessComponent },
      { path: 'confirmemailaddress', component: ConfirmEmailAddressComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'resetpassword', component: ResetPasswordComponent }
    ])
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
