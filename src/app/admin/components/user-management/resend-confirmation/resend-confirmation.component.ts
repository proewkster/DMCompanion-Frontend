import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTOResendConfirmation } from 'src/app/admin/models/UserManagement/dtoresend-confirmation';
import { DTOUserlist } from 'src/app/admin/models/UserManagement/dtouserlist';
import { UserManagementService } from 'src/app/admin/services/user-management.service';
import { GlobalSettings } from 'src/app/shared/globalsettings';

@Component({
  selector: 'app-resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: ['./resend-confirmation.component.scss']
})
export class ResendConfirmationComponent implements OnInit {
  title: string;
  user: DTOUserlist;
  constructor(private _usermanagement: UserManagementService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  public resendConfirmation() {

    const data: DTOResendConfirmation = {
      id: this.user.id,
      clientUri: GlobalSettings['UIServer'] + "/authentication/confirmemailaddress"
    }
    // Send email
    this._usermanagement.resendConfirmation(data)
      .subscribe(response => {
        this._activeModal.close(response);
      },
        error => {
          this._activeModal.close(error);
        });
  }

}
