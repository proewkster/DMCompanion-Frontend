import { SourcedataService } from './../../../../services/sourcedata.service';
import { SourceData_Source } from './../../../../models/sourcedata/sourcedata_source';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-source',
  templateUrl: './delete-source.component.html',
  styleUrls: ['./delete-source.component.scss']
})
export class DeleteSourceComponent implements OnInit {

  source: SourceData_Source;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteSource = () => {
    // Delete source from database
    this._sourcedataService.deleteSource(this.source.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }

}
