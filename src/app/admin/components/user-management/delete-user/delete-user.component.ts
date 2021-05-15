import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTOUserlist } from 'src/app/admin/models/UserManagement/dtouserlist';
import { UserManagementService } from 'src/app/admin/services/user-management.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  title: string;
  user: DTOUserlist;
  constructor(private _activeModal: NgbActiveModal, private _usermanagement: UserManagementService) { }

  ngOnInit(): void {
  }
  public deleteAbility = () => {
    // Delete Ability from database
    this._usermanagement.deleteUser(this.user.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
        error => {
          this._activeModal.close(error);
        });
  }
}
