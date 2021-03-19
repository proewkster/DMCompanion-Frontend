import { AuthenticationService } from './authentication/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DMCompanion-Frontend';

  constructor(private _authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()){
      this._authService.sendAuthenticationChangeNotification(true);
    }
  }


}
