import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Speed } from 'src/app/admin/models/sourcedata/sourcedata_speed';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-speed',
  templateUrl: './delete-speed.component.html',
  styleUrls: ['./delete-speed.component.scss']
})
export class DeleteSpeedComponent implements OnInit {

  speed: SourceData_Speed;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteSpeed = () => {
    // Delete Speed from database
    this._sourcedataService.deleteSpeed(this.speed.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
