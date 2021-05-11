import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public user: User;
  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static"
  }
  constructor(private router: Router, private _modalService: NgbModal, private _userservice: UserService, private _toastrService: ToastrService, private _authenticationservice: AuthenticationService) { }

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
  public showDeleteUserModal = (user: User) => {

    // Open modal
    const modalRef = this._modalService.open(DeleteComponent, this.options);
    modalRef.componentInstance.title = "Delete User";
    modalRef.componentInstance.user = user;

    // Subscribe to the response of the modal
    modalRef.result.then(data => {
      if (data) {

        if (data instanceof HttpErrorResponse) { // Error response, process generic error
          //Show error message
          this._toastrService.error("User profile could not be deleted");
        }
        else { // Process succeeded
          // log out and go to the home page.
          this._authenticationservice.logout();
          this.router.navigateByUrl('/home');

          // Show success message
          this._toastrService.success("Profile successfully removed");
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
