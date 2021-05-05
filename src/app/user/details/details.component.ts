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
  downloadPersonalData() {
    this._userservice.downloadPersonalData().subscribe(x => {

      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(x)));
      element.setAttribute('download', "personalData");

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
    );
  }


}
