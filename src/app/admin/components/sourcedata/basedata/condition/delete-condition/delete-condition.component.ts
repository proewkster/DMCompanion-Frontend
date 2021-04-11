import { SourceData_Condition } from './../../../../../models/sourcedata/sourcedata_condition';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-condition',
  templateUrl: './delete-condition.component.html',
  styleUrls: ['./delete-condition.component.scss']
})
export class DeleteConditionComponent implements OnInit {

  condition: SourceData_Condition;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteCondition = () => {
    // Delete condition from database
    this._sourcedataService.deleteCondition(this.condition.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
