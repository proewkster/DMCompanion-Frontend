import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-race',
  templateUrl: './delete-race.component.html',
  styleUrls: ['./delete-race.component.scss']
})
export class DeleteRaceComponent implements OnInit {

  race: SourceData_Race;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteRace = () => {
    // Delete Race from database
    this._sourcedataService.deleteRace(this.race.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
