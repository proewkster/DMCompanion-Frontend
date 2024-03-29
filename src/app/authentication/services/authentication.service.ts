import { DTO_ResetPassword } from './../models/dto_reset-password';
import { DTO_ForgotPassword } from './../models/dto_forgot-password';
import { DTO_Login } from './../models/dto_login';
import { CustomEncoder } from './../../shared/helpers/custom-encoder';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoints } from 'src/app/shared/enums/api-endpoints';
import { ApiMethod } from 'src/app/shared/enums/api-method';
import { HttpService } from 'src/app/shared/services/http.service';
import { DTO_Register } from '../models/dto_register';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private _authChangeSubject = new Subject<boolean>();
  public authChanged = this._authChangeSubject.asObservable();

  constructor(private _http: HttpService, private _jwtHelper: JwtHelperService) { }

  public registerUser = (data: DTO_Register) => {
    return this._http.requestCall(ApiEndPoints.REGISTER, ApiMethod.POST, null, data);
  }

  public confirmEmail = (token: string, userId: string) => {
    // Build query parameters
    let params = new HttpParams({ encoder: new CustomEncoder() })
      .set('userId', userId)
      .set('token', token);

    // Request API call
    return this._http.requestCall(ApiEndPoints.CONFIRMEMAIL, ApiMethod.GET, null, { params: params });
  }
  
  public login = (data: DTO_Login) => {
    return this._http.requestCall(ApiEndPoints.LOGIN, ApiMethod.POST, null, data);
  }

  public logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Notify subscribers of logout event
    this.sendAuthenticationChangeNotification(false);
  }

  public forgotPassword = (data: DTO_ForgotPassword) => {
    return this._http.requestCall(ApiEndPoints.FORGOTPASSWORD, ApiMethod.POST, null, data);
  }

  public resetPassword = (data: DTO_ResetPassword) => {
    return this._http.requestCall(ApiEndPoints.RESETPASSWORD, ApiMethod.POST, null, data);
  }

  public getAuthenticatedUser = () => {
    // Get token
    const token = localStorage.getItem('token');

    if (token != null) {
      // Decode token
      const decodedToken = this._jwtHelper.decodeToken(token);

      // return username
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    else return "";
  }

  // Authentication state tracking - Keep observable for authentication state so subscribing components know when user is authenticated
  public sendAuthenticationChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSubject.next(isAuthenticated);
  }

  // Authorization methods
  public isAuthenticated = (): boolean => { // Checks if user is authenticated -- Used is authGuard
    // Get token
    const token = localStorage.getItem("token");

    // Check if token is present and if token is valid
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  public isAdmin = (): boolean => { // Checks if user has admin role -- Used in AdminGuard
    // Get token
    const token = localStorage.getItem("token");

    // Return false if token doens't exist
    if(!token) {
      return false;
    }
    
    // Decode token
    const decodedToken = this._jwtHelper.decodeToken(token);
    
    // Get user roles from token
    const roles: [string] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return roles.includes('Admin');
  }
}
