import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTOUserlist } from 'src/app/admin/models/UserManagement/dtouserlist';
import { UserManagementService } from 'src/app/admin/services/user-management.service';
import { DTO_ForgotPassword } from 'src/app/authentication/models/dto_forgot-password';
import { GlobalSettings } from 'src/app/shared/globalsettings';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title: string;
  user: DTOUserlist;
  constructor(private _usermanagement: UserManagementService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  public forgotPassword() {

    const data: DTO_ForgotPassword = {
      email: this.user.email,
      clientUri: GlobalSettings['UIServer'] + "/authentication/resetpassword"
    }
    // Send email
    this._usermanagement.forgotPassword(data)
      .subscribe(response => {
        this._activeModal.close(response);
      },
        error => {
          this._activeModal.close(error);
        });
  }
}
