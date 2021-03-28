import { AuthenticationService } from './../../authentication/services/authentication.service';
import { from } from "rxjs";
import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  username: string;
  title = 'DMCompanion';

  constructor(private _authService: AuthenticationService, private _router: Router) {
    this._authService.authChanged
      .subscribe(res => {
        this.isAuthenticated = res;
        this.username = this._authService.getAuthenticatedUser();
      })
  }

  ngOnInit(): void {
  }
  

  public logout = () => {
    this._authService.logout();
    this._router.navigateByUrl("/");
  }
}
