import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public user: User;
  constructor(private _userservice: UserService) { }

  ngOnInit(): void {
    this._userservice.getUser().subscribe(
      data => {
        this.user = data;
        this._userservice.user = this.user;
      }
    )
  }

}
