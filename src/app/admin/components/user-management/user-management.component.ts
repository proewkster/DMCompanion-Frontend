import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DTOChangeAdmin } from '../../models/UserManagement/dtochange-admin';
import { DTOUserlist } from '../../models/UserManagement/dtouserlist';
import { UserManagementService } from '../../services/user-management.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userlist: DTOUserlist[];

  constructor(private _usermanagement: UserManagementService, private _modalService: NgbModal, private _toastrService: ToastrService) { }
  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }
  ngOnInit(): void {
    this._usermanagement.getUsers().subscribe(data => { this.userlist = data });
  }

  changeAdmin(id: string, adminbool: boolean) {
    adminbool = !adminbool;
    var isadmin: DTOChangeAdmin = new DTOChangeAdmin(id, adminbool)
    this._usermanagement.changeAdmin(isadmin).subscribe(data => {
      var index = this.userlist.findIndex(x => x.id == id);
      this.userlist[index].isAdmin = adminbool;
    });
  }

  public showDeleteUserModal = (user: DTOUserlist) => {

    // Open modal
    const modalRef = this._modalService.open(DeleteUserComponent, this.options);
    modalRef.componentInstance.title = "Delete User";
    modalRef.componentInstance.user = user;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("User could not be removed");
        }
        else { // Process succeeded
          // Remove item from array
          let index = this.userlist.indexOf(user);

          this.userlist.splice(index, 1);

          // Show success message
          this._toastrService.success("User successfully removed");
        }
      }
    },
      error => {
        console.log(error);
        if (error === "Close click" || error === "Cross click") {
          // Modal dismissed, no specific action
          // Error catch is needed to suppress errors in UI
        }
      });
  }

  public showResendConfirmationModal = (user: DTOUserlist) => {

    // Open modal
    const modalRef = this._modalService.open(ResendConfirmationComponent, this.options);
    modalRef.componentInstance.title = "Resend mail confirmation";
    modalRef.componentInstance.user = user;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("The mail could not be send");
        }
        else { // Process succeeded
        
          // Show success message
          this._toastrService.success("Mail successfully send");
        }
      }
    },
      error => {
        console.log(error);
        if (error === "Close click" || error === "Cross click") {
          // Modal dismissed, no specific action
          // Error catch is needed to suppress errors in UI
        }
      });
  }

  public showResetPassMailModal = (user: DTOUserlist) => {

    // Open modal
    const modalRef = this._modalService.open(ForgotPasswordComponent, this.options);
    modalRef.componentInstance.title = "Send reset password mail";
    modalRef.componentInstance.user = user;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("The mail could not be send");
        }
        else { // Process succeeded
         
          // Show success message
          this._toastrService.success("Mail successfully send");
        }
      }
    },
      error => {
        console.log(error);
        if (error === "Close click" || error === "Cross click") {
          // Modal dismissed, no specific action
          // Error catch is needed to suppress errors in UI
        }
      });
  }
}
