import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Sense } from 'src/app/admin/models/sourcedata/sourcedata_sense';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-sense',
  templateUrl: './delete-sense.component.html',
  styleUrls: ['./delete-sense.component.scss']
})
export class DeleteSenseComponent implements OnInit {

  sense: SourceData_Sense;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteSense = () => {
    // Delete Sense from database
    this._sourcedataService.deleteSense(this.sense.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
