import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoveUser } from '../models/dto-remove-user';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  title: string;
  userpassword: string;
  constructor(private _activeModal: NgbActiveModal, private _userservice: UserService) { }

  ngOnInit(): void {
  }
  removePersonalData() {
    var deleteuser:RemoveUser=new RemoveUser(this._userservice.user.id,this.userpassword);
    this._userservice.deletePersonalData(deleteuser).subscribe(response => {
      this._activeModal.close(response);
    },
      error => {
        this._activeModal.close(error);
      })
  }
}
