import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Feat } from 'src/app/admin/models/sourcedata/sourcedata_feat';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-feat',
  templateUrl: './delete-feat.component.html',
  styleUrls: ['./delete-feat.component.scss']
})
export class DeleteFeatComponent implements OnInit {

  feat: SourceData_Feat;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteFeat = () => {
    // Delete Feat from database
    this._sourcedataService.deleteFeat(this.feat.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
