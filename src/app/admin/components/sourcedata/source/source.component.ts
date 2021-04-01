import { AddSourceComponent } from './add-source/add-source.component';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-sourcedata-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public showAddSourceModal = () => {
    // Define modal options
    let options: NgbModalOptions = { 
      animation: true,
      centered: true,
      keyboard: true
    };

    // Open modal
    const modalRef = this._modalService.open(AddSourceComponent, options);
    modalRef.componentInstance.title = "Add Source";
  }
}
