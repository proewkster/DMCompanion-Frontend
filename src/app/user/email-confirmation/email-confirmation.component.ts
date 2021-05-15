import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  public isConfirmed: boolean;
  public isFailed: boolean;
  constructor(private _userService:UserService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }
  private confirmEmail = () => { 
    // Initialize properties
    this.isConfirmed = false;
    this.isFailed = false;

    // Retrieve query parameters from route
    const token = this._route.snapshot.queryParams['token'];
    const userId = this._route.snapshot.queryParams['userId'];
    const email = this._route.snapshot.queryParams['email'];

    // Call API endpoint to confirm user account
    this._userService.confirmEmail(token,email, userId)
      .subscribe(_ => {
        this.isConfirmed = true;
      },
      error => {
        this.isFailed = true;
      })
  }
}
